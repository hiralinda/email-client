# Email Client

This project is a simple email client built using Django for the backend and JavaScript for the frontend, allowing users to send, receive, and manage emails in a single-page application (SPA) format. The entire application runs on a single web page without refreshing, providing a seamless user experience. [This project](https://cs50.harvard.edu/web/2020/projects/3/mail/) is a part of the CS50 Web Programming with Python and JavaScript course.

## Video Preview

[Video Link](https://youtu.be/7ci0fyAInos)

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Mailbox Management**: Users have access to three mailboxes: Inbox, Sent, and Archive.
- **Compose Email**: Users can compose and send emails.
- **Email Viewing**: Users can view the details of each email, including sender, recipients, subject, timestamp, and body.
- **Email Archiving**: Users can archive and unarchive emails.
- **Reply to Emails**: Users can reply to emails with pre-filled information based on the original message.

## Requirements

Before running the project, ensure you have the following installed:

- Python 3.x
- Django

## Installation

1. **Clone the repository**:
    ```bash
   git clone <repository-url>
   cd <repository-directory>
    ```

2. **Create a virtual environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Apply migrations**:
    ```bash
    python manage.py migrate
    ```

5. **Run the development server**:
    ```bash
    python manage.py runserver
    ```

6. **Access the application**:
    Open your browser and go to `http://127.0.0.1:8000/`.

    ## Usage

1. Use the **Register** link to create a new account.
2. Log in with your credentials.
3. Navigate between **Inbox**, **Sent**, and **Archived** mailboxes.
4. Click **Compose** to write and send new emails.
5. Click on an email to view its content and options to reply, archive, or unarchive.

## Technologies Used

- **Frontend**: HTML, CSS (Bootstrap 5 CSS), JavaScript
- **Backend**: Django
- **Database**: SQLite3

## Future Improvements

- **Search Functionality**: Implement search for emails based on subjects or senders.
- **Email Filtering**: Allow users to filter emails by date or read/unread status.
- **User Profiles**: Enhance user profiles with avatars and additional settings.
- **Email Attachments**: Allow users to attach files to their emails.
- **Notifications**: Implement real-time notifications for new emails.

---

*[This project](https://cs50.harvard.edu/web/2020/projects/3/mail/) is a part of the CS50 Web Programming with Python and JavaScript course.*


