// Function to handle user registration form submission
const apiHost = 'http://localhost:3000/api/v1';

const registerUser = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Construct the user object with photoId as an object
  const userFields = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    positionId: parseInt(formData.get('positionId')),
    photo: {
      id: formData.get('photoId'),
    },
  };

  try {
    const response = await fetch(`${apiHost}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userFields),
    });

    if (response) {
      alert('User registered successfully!');
      form.reset(); // Clear the form after successful registration
    } else {
      const errorData = await response.json();
      alert('Failed to register user: ' + errorData.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
const getRegistrationToken = async (event) => {
  event.preventDefault();

  try {
    // Make API call to get user by ID
    const response = await fetch(`${apiHost}/token/`);

    const tokenField = document.getElementById('registration-token');
    tokenField.innerHTML = ``;
    if (response) {
      const { token } = await response.json();

      document.getElementById('registration-token').innerHTML =
        `token - ${token}`;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to handle get user by ID form submission
const getUserById = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const userId = formData.get('userId');

  try {
    // Make API call to get user by ID
    const response = await fetch(`${apiHost}/user/${userId}`);

    if (response) {
      const { user } = await response.json();
      // Update HTML to display user details
      document.getElementById('user-details').innerHTML = `
                <h3>User Details</h3>
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Position:</strong> ${user.position}</p>
                <p><strong>Position ID:</strong> ${user.positionId}</p>
                <p><strong>Registration Date:</strong> ${user.registrationDate}</p>
                <img src="${user.photo}" alt="User Photo">
            `;
    } else {
      // Handle error
      console.error('Failed to get user');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to handle get all users button click
const getAllUsers = async () => {
  try {
    // Make API call to get all users
    const response = await fetch(`${apiHost}/user`);
    const usersData = await response.json();

    if (response) {
      // Update HTML to display all users
      const allUsersContainer = document.getElementById('all-users');
      allUsersContainer.innerHTML = ''; // Clear previous content

      usersData.users.forEach((user) => {
        const userHtml = `
                    <div>
                        <h3>User Details</h3>
                        <p><strong>ID:</strong> ${user.id}</p>
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Position:</strong> ${user.position}</p>
                        <p><strong>Position ID:</strong> ${user.positionId}</p>
                        <p><strong>Registration Date:</strong> ${user.registrationDate}</p>
                        <img src="${user.photo}" alt="User Photo">
                    </div>
                    <hr>
                `;
        allUsersContainer.innerHTML += userHtml;
      });
    } else {
      // Handle error
      console.error('Failed to get all users');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to handle get all positions button click
const getAllPositions = async () => {
  try {
    // Make API call to get all positions
    const response = await fetch(`${apiHost}/position`);

    if (response) {
      const positionsData = await response.json();
      // Update HTML to display all positions
      const allPositionsContainer = document.getElementById('all-positions');
      allPositionsContainer.innerHTML = ''; // Clear previous content

      positionsData.forEach((position) => {
        const positionHtml = `
                    <div>
                        <h3>Position Details</h3>
                        <p><strong>ID:</strong> ${position.id}</p>
                        <p><strong>Name:</strong> ${position.name}</p>
                        <p><strong>Created At:</strong> ${position.createdAt}</p>
                        <p><strong>Updated At:</strong> ${position.updatedAt}</p>
                    </div>
                    <hr>
                `;
        allPositionsContainer.innerHTML += positionHtml;
      });
    } else {
      // Handle error
      console.error('Failed to get all positions');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Function to handle file upload form submission
// Function to handle file upload form submission
const handleFileUpload = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Get the file input element
  const fileInput = document.getElementById('file');
  // Get the selected file from the input element
  const file = fileInput.files[0];
  // Append the file to the form data
  formData.append('photo', file);

  try {
    // Make API call to upload file
    const response = await fetch(`${apiHost}/user/photo`, {
      method: 'POST',
      body: formData,
    });

    if (response) {
      const responseData = await response.json();
      console.log(responseData);
      // Display response message or details
      document.getElementById('file-upload-response').innerText = responseData;
    } else {
      // Handle error
      console.error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Event listener for file upload form submission
document
  .getElementById('file-upload-form')
  .addEventListener('submit', handleFileUpload);

// Event listener for file upload form submission
document
  .getElementById('file-upload-form')
  .addEventListener('submit', handleFileUpload);

// Event listeners
document
  .getElementById('user-registration-form')
  .addEventListener('submit', registerUser);
document
  .getElementById('get-user-form')
  .addEventListener('submit', getUserById);
document.getElementById('get-all-users').addEventListener('click', getAllUsers);
document
  .getElementById('get-all-positions')
  .addEventListener('click', getAllPositions);

document
  .getElementById('get-registration-token')
  .addEventListener('click', getRegistrationToken);
