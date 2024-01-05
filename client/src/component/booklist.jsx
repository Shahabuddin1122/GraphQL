import { gql, useQuery } from '@apollo/client';
import { useLayoutEffect, useState } from 'react';

// Inside BookList component
function BookList() {
    const [books, setBooks] = useState([]);

    useLayoutEffect(() => {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    {
                        books {
                            name
                            id
                            genre
                            author {
                                name
                            }
                        }
                    }
                `,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetch Data:', data.data.books);
            setBooks(data.data.books);
        })
        .catch(error => console.error('Fetch Error:', error));
    }, []);

    return (
        <>
            <ul>
                {books.map(data => (
                    <li key={data.id}>{data.name}</li>
                ))}
            </ul>
        </>
    );
}

export default BookList;