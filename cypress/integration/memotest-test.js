/// <reference types="cypress" />

const URL = '192.168.0.106:8080';

context('memotest', () => {
    before(() => {
        cy.visit(URL);
    });

    const NUMBER_OF_SQUARES = 16;

    it('Tests if there are a correct number of squares in the game', () => {
        cy.get('.board').find('.square').should('have.length', NUMBER_OF_SQUARES);
    });

    it('Tests if squares colors are the same', () => {
        cy.get('.square .color').then((squares) => {
            let originalColors = [];
            squares.each(function (i, square) {
                originalColors.push(square.style.color);
            });

            cy.visit(URL);

            let newColors = [];
            cy.get('.square .color').then((squares) => {
                squares.each(function (i, square) {
                    newColors.push(square.style.background);
                });
            });

            cy.wrap(originalColors).should('not.deep.equal', newColors);
        });
    });

    describe('Plays the game', () => {
        let pairsMap, pairsList;
        it('Chooses a wrong pair', () => {
            cy.get('.color').then(squares => {
                pairsMap = getPairsSquares(squares);
                pairsList = Object.values(pairsMap);

                cy.get(pairsList[0][0]).click();
                cy.get(pairsList[1][0]).click();

                cy.get('.done').should('have.length', 0);
                //since i picked wrong no square should be marked as done
            });
        });

        it('Solves the game', () => {
            cy.get('.square').should('have.length', NUMBER_OF_SQUARES);

            pairsList.forEach(pair => {
                cy.get(pair[0]).click();
                cy.get(pair[1]).click();
            });

            cy.get('.done').should('have.length', NUMBER_OF_SQUARES);

            cy.get('.board').should('not.be.visible');
            cy.get('.message-board').should('be.visible');

            const totalTurns = NUMBER_OF_SQUARES / 2 + 1; //coz we tested one incorrect
            cy.get('.message > h2').
                should('be.visible').
                contains(
                    `Solo te tomo ${totalTurns} turnos.`,
                );
        });
    });
});

function getPairsSquares(squares) {
    const pairs = {};   //un diccionario

    squares.each((i, square) => {
        const squareColor = square.style.background;

        if (pairs[squareColor]) {
            pairs[squareColor].push(square);
        } else {
            pairs[squareColor] = [square];
        }
    });

    console.log(pairs);
    return pairs;
}