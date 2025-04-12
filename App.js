import { Button, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const App = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [score, setScore] = useState({ X: 0, O: 0 });

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: [a, b, c] };
            }
        }
        return null;
    };

    const winnerInfo = calculateWinner(board);
    const winner = winnerInfo?.winner;
    const winningLine = winnerInfo?.line || [];

    const handleClick = (index) => {
        if (board[index] || winner) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const newWinnerInfo = calculateWinner(newBoard);
        if (newWinnerInfo?.winner) {
            setScore((prevScore) => ({
                ...prevScore,
                [newWinnerInfo.winner]: prevScore[newWinnerInfo.winner] + 1
            }));
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Хрестики-Нулики</Text>
            <Text style={styles.score}>
                (X) {score.X}:{score.O} (O)
            </Text>

            <View style={styles.board}>
                {board.map((value, index) => {
                    const isWinningCell = winningLine.includes(index);
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.cell, isWinningCell && styles.winningCell]}
                            onPress={() => handleClick(index)}
                        >
                            <Text style={styles.cellText}>{value}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {winner ? (
                <View style={styles.winnerContainer}>
                    <Text style={styles.winnerText}>{winner} виграв!</Text>
                    <Button title="Нова гра" onPress={resetGame} />
                </View>
            ) : (
                <Text style={styles.turnText}>
                    Черга гравця: {isXNext ? 'Хрестики (X)' : 'Нулики (0)'}
                </Text>
            )}

            <StatusBar />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 10
    },
    score: {
        fontSize: 20,
        marginBottom: 20
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 300,
        height: 300,
        marginBottom: 20
    },
    cell: {
        width: '33.33%',
        height: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff'
    },
    winningCell: {
        backgroundColor: '#18f60a'
    },
    cellText: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    winnerContainer: {
        alignItems: 'center'
    },
    winnerText: {
        fontSize: 20,
        marginBottom: 10
    },
    turnText: {
        fontSize: 18,
        marginTop: 20
    }
});

