import { gql, useQuery } from '@apollo/client';
import { useLayoutEffect, useState } from 'react';

// Inside BookList component
function addBook() {
    const [authors, setAuthors] = useState([]);
    const [name,setName] = useState()
    const [genre,setGenre] = useState()
    const [author,setAuthor] = useState()
    useLayoutEffect(() => {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    {
                        authors {
                            name
                            id
                        }
                    }
                `,
                
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetch Data:', data.data.authors);
            setAuthors(data.data.authors);
        })
        .catch(error => console.error('Fetch Error:', error));
    }, []);
    const submitForm = (e)=>{
        e.preventDefault();
        console.log(name + genre + author)
        fetch("http://localhost:4000/graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        addBook(name: "${name}", genre: "${genre}", authorId: "${author}") {
                            name
                        }
                    }
                `,
                refetchQueries: 
                `
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
                `
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
        
    }

    return (
        <>
            <form action="" onSubmit={submitForm}>
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text" onChange={(e)=>(setName(e.target.value))}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e)=>(setGenre(e.target.value))}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e)=>(setAuthor(e.target.value))}>
                        <option >Select author</option>
                        {authors.map((author)=>(
                            <option key={author.id} value={author.id}>{author.name}</option>
                        ))}
                    </select>
                </div>
                <button>+</button>
            </form>
        </>
    );
}

export default addBook;