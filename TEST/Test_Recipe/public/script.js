document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const recipesContainer = document.getElementById('recipesContainer');
    let editingRecipeIndex = null;



    // Default recipes
    const defaultRecipes = [
        // ... (existing default recipes)
        {
            title: 'Garlic chicken',
            ingredients: '4 cloves of garlic, 2 x 150g skinless free-range chicken breasts, ½ x 700g jar of chickpeas, 250g baby spinach, 1 heaped teaspoon sumac',
            instructions: 'Peel the garlic cloves and slice lengthways, then place in a large non-stick frying pan on a high heat with 1 tablespoon of olive oil, stirring regularly. Slice each chicken breast lengthways into 3 strips, then toss with a pinch of sea salt and black pepper. Once the garlic is nicely golden, quickly remove from the pan with a slotted spoon, leaving the flavoured oil behind. Go in with the chicken and cook for 5 minutes, or until golden and cooked through, turning regularly. Remove the chicken from the pan and tip in the chickpeas (juices and all). Add the spinach, along with most of the garlic and 1 tablespoon of red wine vinegar, then toss over the heat until the spinach has wilted and the chickpeas are hot through. Season to perfection with salt and pepper, then return the chicken to the pan and finish with the reserved garlic and a generous dusting of sumac.',
            image: 'https://www.foodnetwork.com/content/dam/images/food/fullset/2011/9/1/2/MN0502H_roasted-garlic-clove-chicken_s4x3.jpg',
            author: 'Unknown',
            submissionDate: 'Unknown'
        },
        {
            title: 'Quick salt cod',
            ingredients: '2 x 150 g cod fillets, 500 g Maris Piper potatoes, 2 large free-range eggs, ½ a bunch of flat-leaf parsley, 2 teaspoons black olive tapenade',
            instructions: 'Season the cod very generously all over with sea salt (don’t worry, we’ll rinse it away later) and leave aside. Meanwhile, scrub and chop the potatoes into 1cm cubes, then place in a large non-stick frying pan on a medium heat with 2 tablespoons of olive oil and a pinch of salt and black pepper. Cook for 10 minutes, or until slightly golden, tossing occasionally. Rinse the fish and pat dry with kitchen paper (this fast salting will season the fish, but most importantly will make it flakier and juicier). Push the potatoes to one side of the pan, then add the fish and cook for 3½ minutes on each side, or until just cooked, not forgetting to take care of the potatoes. Meanwhile, beat the eggs together in a bowl. Pick half the parsley leaves and put aside, then finely chop the rest (stalks and all) and add to the eggs. Remove the pan from the heat, transfer the fish to a plate, then pour the egg mixture over the crispy potatoes in the pan. Toss vigorously together for 30 seconds (the residual heat of the pan will just cook the eggs to a silky-soft scramble), then divide between serving plates. Remove and discard the fish skin, and flake the flesh over the potatoes, then dot over the olive tapenade. Scatter with the remaining parsley leaves, dressed with a little extra virgin olive oil and red wine vinegar. Delicious served with a fresh green salad.',
            image: 'https://ww2.kqed.org/app/uploads/sites/14/2015/08/hero-salt-cod1920.jpg',
            author: 'Unknown',
            submissionDate: 'Unknown'
        },
        {
            title: 'Beetroot bucatini',
            ingredients: '380 g bucatini, 40 g feta, 1 large beetroot, 1 tbsp olive oil, 1 onion, 2 garlic cloves, 1 tbsp chopped parsley stems, 1 tbsp chopped fresh basil stems, 4 tbsp nutritional yeast, ½ lemon, 1 tsp salt, ½ tsp black pepper, 70 ml oat milk',
            instructions: 'To make the beetroot sauce: bring a pan of water to the boil, add the whole beetroot and cook for 10–15 minutes or until tender. Drain the beetroot and set aside to cool for a few minutes, then cut into quarters. Meanwhile, in a non-stick frying pan over medium heat, heat the olive oil and cook the onion, garlic, parsley and basil stems for 3–5 minutes until fragrant and soft. Remove from the heat; do not wash the pan. Put the beetroot into a food processor or blender, add the onion mixture, nutritional yeast, lemon juice, salt and pepper. Pulse for 1 minute, then, with the motor running, stream in the milk. Blend on high speed until very smooth. If the sauce is too thick, add a little more milk, 1 tablespoon at a time, to loosen. Bring a large pan of salted water to the boil, add the bucatini and cook for 9 minutes or until al dente. Drain the pasta, reserving 4–5 tablespoons of the pasta cooking water. Meanwhile, prepare the crispy garlic breadcrumbs. In a separate frying pan, heat the oil over medium heat, add the garlic and fry for 1 minute until lightly browned. Add the breadcrumbs and cook, stirring frequently, until the breadcrumbs are lightly charred and fragrant, about 2–3 minutes. Remove from the heat and set aside. In the same frying pan used for the onion and garlic, add the cooked pasta and beetroot sauce and stir well over low–medium heat for 2 minutes. If too thick, stir in some of the reserved pasta water. Serve the pasta in bowls or on plates, garnished with roughly torn basil leaves, crumbled feta cheese and crispy garlic breadcrumbs.',
            image: 'https://www.foodwise.com.au/wp-content/uploads/2013/11/Roasted-beetroot-pasta-sauce-background.jpg',
            author: 'Unknown',
            submissionDate: 'Unknown'
        }

    ];

    // Display the default recipes
    defaultRecipes.forEach(recipe => {
        addRecipeCard(recipe);
    });

    recipeForm.addEventListener('submit', event => {
        event.preventDefault();  // Prevents the default form submission behavior

        const recipe = {
            title: document.getElementById('recipeName').value,
            ingredients: document.getElementById('ingredients').value,
            instructions: document.getElementById('instructions').value,
            image: document.getElementById('recipeImage').value,
            author: document.getElementById('authorName').value,
            submissionDate: new Date().toLocaleDateString()
        };

        if (editingRecipeIndex !== null) {
            // If editing an existing recipe
            updateRecipeCard(editingRecipeIndex, recipe);
            editingRecipeIndex = null;  // Reset the editing index
        } else {
            addRecipeCard(recipe);
        }

        // Reset the form
        recipeForm.reset();
    });

    function addRecipeCard(recipe) {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Author:</strong> ${recipe.author}</p>
            <p><strong>Date:</strong> ${recipe.submissionDate}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.substring(0, 100)}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions.substring(0, 100)}</p>
            <img src="${recipe.image}" alt="Recipe Image">
            <button class="more-button" onclick="toggleRecipe(this)">Click for more</button>
            <button class="edit-button" onclick="editRecipe(this)">Edit</button>
            <div class="full-recipe" style="display: none;">
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            </div>
        `;

        recipesContainer.appendChild(card);
    }

    function toggleRecipe(button) {
        const fullRecipe = button.parentElement.querySelector('.full-recipe');

        if (!fullRecipe) {
            console.log("No more content available.");
            return;  // Exit the function if there's no content
        }

        if (fullRecipe.style.display === 'none' || fullRecipe.style.display === '') {
            fullRecipe.style.display = 'block';
            button.innerText = 'Click to hide';
        } else {
            fullRecipe.style.display = 'none';
            button.innerText = 'Click for more';
        }
    }

    function editRecipe(button) {
        const recipeCard = button.parentElement;
        const title = recipeCard.querySelector('h3').innerText;
        const ingredients = recipeCard.querySelector('p:nth-child(4)').innerText;
        const instructions = recipeCard.querySelector('p:nth-child(5)').innerText;
        const image = recipeCard.querySelector('img').src;

        document.getElementById('recipeName').value = title;
        document.getElementById('ingredients').value = ingredients;
        document.getElementById('instructions').value = instructions;
        document.getElementById('recipeImage').value = image;

        // Set the index of the recipe being edited
        editingRecipeIndex = Array.from(recipesContainer.children).indexOf(recipeCard);
    }

    function updateRecipeCard(index, updatedRecipe) {
        const cardToUpdate = recipesContainer.children[index];
        const fullRecipe = cardToUpdate.querySelector('.full-recipe');
        const title = cardToUpdate.querySelector('h3');
        const author = cardToUpdate.querySelector('p:nth-child(2)');
        const date = cardToUpdate.querySelector('p:nth-child(3)');
        const ingredients = cardToUpdate.querySelector('p:nth-child(4)');
        const instructions = cardToUpdate.querySelector('p:nth-child(5)');
        const image = cardToUpdate.querySelector('img');

        title.innerText = updatedRecipe.title;
        author.innerText = `Author: ${updatedRecipe.author}`;
        date.innerText = `Date: ${updatedRecipe.submissionDate}`;
        ingredients.innerText = `Ingredients: ${updatedRecipe.ingredients.substring(0, 100)}`;
        instructions.innerText = `Instructions: ${updatedRecipe.instructions.substring(0, 100)}`;
        image.src = updatedRecipe.image;

        fullRecipe.innerHTML = `
            <p><strong>Ingredients:</strong> ${updatedRecipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${updatedRecipe.instructions}</p>
        `;
    }
});
