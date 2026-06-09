```mermaid
sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: User types in the form and clics save
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp new_note_spa
    Note left of server: server saves the data and responds with 201
    server-->>browser: 201 Created
```