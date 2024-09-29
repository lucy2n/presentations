import React from 'react';
import { useState } from "react";
import DemoPresentation from "../../components/demo-presentation/demo-presentation";
import { Button, Container, Pagination } from "@mui/material";
import VerticalToggleButtons from "../../components/vertical-toggle-buttons/vertical-toggle-buttons";
import styles from './main-page.module.css';

const presentations = [
    {
        name: 'some',
        id: 1
    },
    {
        name: 'some',
        id: 2
    },
    {
        name: 'some',
        id: 3
    },
    {
        name: 'some',
        id: 4
    },
    {
        name: 'some',
        id: 5
    },
    {
        name: 'some',
        id: 6
    }
]

const MainPage = ({ addUser }) => {
    const [view, setView] = useState('module');

    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Presentations</h1>
            <div className={styles.buttons}>
                <Button>Create new</Button>
                <VerticalToggleButtons view={view} handleChange={handleChange} />
            </div>
            {view === 'list' ? (
                <Container maxWidth="md" className={styles.container}>
                    {presentations.map((presentation) => (
                        <DemoPresentation
                            key={presentation.id}
                            view={view}
                            presentation={presentation}
                            addUser={addUser}
                        />
                    ))}
                </Container>
            ) : (
                <div className={styles.column}>
                    {presentations.map((presentation) => (
                        <DemoPresentation
                            key={presentation.id}
                            view={view}
                            presentation={presentation}
                            addUser={addUser}
                        />
                    ))}
                </div>
            )}
            <Pagination count={10} />
        </div>
    );
};

export default MainPage;