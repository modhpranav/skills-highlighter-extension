function injectCustomStyles() {
    let style = document.createElement('style');

    style.textContent = `
        .card-container {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Example shadow */
            display: flex;
            align-items: flex-start;
            font-family: 'Roboto', sans-serif; /* New font */
        }
        
        .my-extension-card, .hidden-card {
            max-width: 20rem;
            background-color: beige;
            color: black;
            margin-bottom: 1rem;
            border-radius: .25rem;
            border-radius: 8px; /* Rounded borders */
            margin-top: 20px;
            margin-right: 10px; /* Space between cards */
            font-style: inherit; /* Inherit the font style */
            transition: box-shadow 0.3s ease, transform 0.3s ease; /* Smooth transition for hover effect */
            
        }
        .my-extension-card {
            display: block; /* The first card is visible initially */
        }
        .hidden-card {
            display: none; /* Initially hide the new card */
        }
        .card-header:hover .card-icon {
            // Example: Change color on hover
            color: #f00; // Just an example, adjust the color as needed
        }
        .my-extension-card-header { 
            display: flex; /* Use flex to align items in a row */
            justify-content: space-between; /* Push the header and close button to opposite ends */
            align-items: center; /* Center items vertically */
            background-color: #17a2b8; 
            padding: .75rem 1.25rem; 
            margin-bottom: 0; 
            border-bottom: 1px solid rgba(0, 0, 0, .125); 
        }
        .show-card-button {
            cursor: pointer;
            background-color: #17a2b8;
            color: #fff;
            border: none;
            padding: 10px;
            border-radius: 5px;
            align-self: top; /* This will vertically center the button relative to the cards */
            margin-top: 20px; /* Align with the top margin of cards */
        }
        .btn-close {
            color: black;
            padding: 2px 10px;
            font-size: 19px;
            cursor: pointer;
            border-radius: 1px;
            margin-left: 1px;
        }
        
        /* Additional style for the closeButtonContainer if needed */
        .closeButtonContainer {
            flex-shrink: 0; /* Prevent the container from shrinking */
        }
        .my-extension-card-body { 
            padding: 1.25rem;
            margin-left: 20px;
            max-height: 200px; // Set a maximum height
            overflow-y: auto; // Enable vertical scrolling
            padding: 1.25rem;
            
        }
        .btn-close:hover, .btn-close:focus {
            color: #d63384; /* Color change on hover/focus */
            opacity: 1; /* Full opacity on hover/focus */
            outline: none; /* Removes the outline to keep the design clean */
            cursor: pointer; /* Show the pointer on hover */
        }
        .list-group-item {
            display: block; /* Ensure each list item is block-level for proper layout */
            width: 100%; /* Ensures list items span the full width of the card body */
        }
        .my-extension-card:hover, .hidden-card:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* More prominent shadow on hover */
            transform: translateY(-2px); /* Slight lift effect */
        }
        .show { display: block; }
    `;
    document.head.appendChild(style);
}

export { injectCustomStyles };