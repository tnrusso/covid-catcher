import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export function QuestStart() {
    
    return (
        <div className="quest-start-content">
            <h1 className="quest-h1">Welcome To The Covid-19 Questionnaire!</h1>
            <hr />
            <p className="quest-normal-text">
                This short survey will guide you through a series of questions that will
                help you determine what steps you need to take to protect youreself 
                and others from Covid-19.
            </p>
            <form action="/questionnaire">
                <input type="submit" class="start-quest-button" value="Start Questionnaire"/>
            </form>
        </div>
    );
}