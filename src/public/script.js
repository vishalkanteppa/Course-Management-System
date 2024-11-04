// URL of the backend API
const API_URL = 'http://localhost:3000/courses';

function getCourseObject() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const module_name = document.getElementById('module-title').value.trim();
    const lesson_name = document.getElementById('lesson-title').value.trim();
    const lesson_description = document.getElementById('lesson-description').value.trim();
    const content_type = document.getElementById('content-type').value.trim();
    const content_text = document.getElementById('content-text').value.trim();

    const lesson_topics_string = document.getElementById('lesson-topics').value;
    const lesson_topics = lesson_topics_string.split(',').map(item => item.trim());

    const courseData = {
        title: title,
        description: description,
        module_name: module_name,
        lesson_name: lesson_name,
        lesson_description: lesson_description,
        lesson_topics: lesson_topics,
        content_type: content_type,
        content_text: content_text
    }

    return {
        coursedata: courseData
    };
}

function showResultMessage(message, deletebox = false) {
    let resultDiv = null;
    if (deletebox == true) {
        resultDiv = document.getElementById('delete-result-message');
    }
    else {
        resultDiv = document.getElementById('result-message');
    }
    resultDiv.innerHTML = message;
    resultDiv.style.display = 'block';
}

// course creation
document.getElementById('create-course-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const course = getCourseObject();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
        if (response.ok) {
            showResultMessage('Course created successfully');
        } else {
            if (response.status == 409) {
                showResultMessage('Course with this title already exists');
                return;
            }
            showResultMessage('Internal error');
        }
    } catch (error) {
        console.log(error);
    }
});

// update course function
document.getElementById('update-btn').addEventListener('click', async function (event) {
    event.preventDefault();

    const course = getCourseObject();

    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
        const data = await response.json();
        if (response.ok) {
            showResultMessage(data.message);
            return;
        } else {
            if (response.status == 404) {
                showResultMessage(data.message);
                return;
            }
            showResultMessage('Internal error');
        }
    } catch (error) {
        console.log(error);
    }

});

// display courses function
async function getCourses() {
    try {
        const response = await fetch(API_URL);

        if (response.status == 204) {
            const getmessage = document.getElementById('course-list');
            getmessage.innerHTML = 'No courses created yet';
            return;
        }

        else if (response.status == 200) {
            const courses = await response.json();

            const courseList = document.getElementById('course-list');
            courseList.innerHTML = '';

            courses.forEach((course) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Title: ${course.title}, Description: ${course.description}`;
                courseList.appendChild(listItem);
            }
            )
        };
    } catch (error) {
        console.log(error);
    }
}

// delete course function
document.getElementById('delete-course-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const course_title = document.getElementById('delete-title').value.trim();

    data = { coursetitle: course_title };

    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            showResultMessage('Course deleted successfully', deletebox = true);
        } else {
            if (response.status == 404) {
                showResultMessage('Course does not exist', deletebox = true);
                return;
            }
            showResultMessage('Internal error', deletebox = true);
        }
    } catch (error) {
        console.log(error);
    }
});