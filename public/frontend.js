// Function to handle user registration form submission
// const apiHost = 'https://user-positions-new.onrender.com/api/v1';
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
    const response = await fetch(`${apiHost}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'registration-token': formData.get('registration-token'),
      },
      body: JSON.stringify({ user: userFields }),
    });
    const jsonResponse = await response.json();

    if (jsonResponse.error) {
      alert(jsonResponse.error);

      return;
    }

    if (response) {
      alert('SUCCESS');
      form.reset();
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
const getAllUsers = async (event) => {
  try {
    // Make API call to get all users
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const count = formData.get('count');
    const page = formData.get('page');
    const offset = formData.get('offset');
    console.log({ count, page, offset });
    const query = `?${count ? `count=${count}&` : ''}${page ? `page=${page}&` : ''}${offset ? `offset=${offset}` : ''}`;
    console.log(query);
    const response = await fetch(`${apiHost}/user${query}`);
    const usersData = await response.json();

    if (response) {
      // Update HTML to display all users
      const allUsersContainer = document.getElementById('all-users');
      allUsersContainer.innerHTML = ''; // Clear previous content
      const allUsersContainerPagination = document.getElementById(
        'all-users-pagination',
      );
      allUsersContainerPagination.innerHTML = `<div>
                      <p><strong>count:</strong> ${usersData.count}</p>
                      <p><strong>totalUsers:</strong> ${usersData.totalUsers}</p>
                      <p><strong>totalPages:</strong> ${usersData.totalPages}</p>
                      <p><strong>page:</strong> ${usersData.page}</p>
                      <p><strong>nextPage</strong> ${usersData.links.nextUrl ?? 'this is last page'}</p>
                      <p><strong>prevPage</strong> ${usersData.links.previousUrl ?? 'this is first page'}</p>
                  </div>`;
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
                      <img src="${user.photo.replace(/^\.\/public\//, '')}" alt="User Photo">
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

      const allPositionsContainer = document.getElementById('all-positions');
      allPositionsContainer.innerHTML = '';

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

const handleFileUpload = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData();

  const fileInput = document.getElementById('photo');

  const file = fileInput.files[0];
  console.dir(file, { depth: null });

  formData.append('photo', file);

  try {
    const response = await fetch(`${apiHost}/user/photo`, {
      method: 'POST',
      body: formData,
    });

    if (response) {
      const responseData = await response.json();
      console.log(responseData);

      document.getElementById('file-upload-response').innerHTML = `
                 <div>
                        <h3>File info</h3>
                        <p><strong>ID:</strong> ${responseData.id}</p>
                        <p><strong>Key:</strong> ${responseData.key}</p>
                        <p><strong>Created At:</strong> ${responseData.createdAt}</p>
                        <p><strong>Updated At:</strong> ${responseData.updatedAt}</p>
                    </div>
                    <hr>`;
    } else {
      console.error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

document
  .getElementById('file-upload-form')
  .addEventListener('submit', handleFileUpload);

document
  .getElementById('file-upload-form')
  .addEventListener('submit', handleFileUpload);

document
  .getElementById('user-registration-form')
  .addEventListener('submit', registerUser);
document
  .getElementById('get-user-form')
  .addEventListener('submit', getUserById);
document
  .getElementById('get-all-users-form')
  .addEventListener('submit', getAllUsers);
document
  .getElementById('get-all-positions')
  .addEventListener('click', getAllPositions);

document
  .getElementById('get-registration-token')
  .addEventListener('click', getRegistrationToken);
