document.addEventListener("DOMContentLoaded", function () {
  // Use buttons to toggle between views
  document
    .querySelector("#inbox")
    .addEventListener("click", () => load_mailbox("inbox"));
  document
    .querySelector("#sent")
    .addEventListener("click", () => load_mailbox("sent"));
  document
    .querySelector("#archived")
    .addEventListener("click", () => load_mailbox("archive"));
  document
    .querySelector("#compose")
    .addEventListener("click", () => compose_email());

  // By default, load the inbox
  load_mailbox("inbox");

  // Add event listener to the compose form
  document
    .querySelector("#compose-form")
    .addEventListener("submit", send_email);
});

function compose_email(recipients = "", subject = "", body = "") {
  // Show compose view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#email-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";

  // Clear out composition fields
  document.querySelector("#compose-recipients").value = recipients;
  document.querySelector("#compose-subject").value = subject;
  document.querySelector("#compose-body").value = body;
}

function send_email(event) {
  event.preventDefault();

  // Get values from the form
  const recipients = document.querySelector("#compose-recipients").value;
  const subject = document.querySelector("#compose-subject").value;
  const body = document.querySelector("#compose-body").value;

  // Send the email via POST request
  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      const errorMessage = document.getElementById("error-message");
      const messageContainer = document.getElementById("message-container");

      if (result.error) {
        console.log("Error occurred:", result.error);
        errorMessage.innerHTML = result.error;
        errorMessage.style.display = "block";
        setTimeout(() => {
          //console.log("Hiding error message");
          errorMessage.style.display = "none";
        }, 5000);
      } else {
        console.log("Operation successful:", result.message);
        errorMessage.style.display = "none";
        load_mailbox("sent");
        messageContainer.innerHTML = result.message;
        messageContainer.style.display = "block";
        setTimeout(() => {
          // console.log("Hiding success message");
          messageContainer.style.display = "none";
        }, 5000);
      }
    });
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#email-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "none";

  // Show the mailbox name
  document.querySelector("#emails-view").innerHTML =
    `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Fetch the emails for the given mailbox
  fetch(`/emails/${mailbox}`)
    .then((response) => response.json())
    .then((emails) => {
      // Clear any existing emails
      document.querySelector("#emails-view").innerHTML = "";

      // Show the mailbox name
      document.querySelector("#emails-view").innerHTML =
        `<h3 style="text-align: center;">${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

      // Display each email
      emails.forEach((email) => {
        const element = document.createElement("div");
        element.className = "email";
        element.style.borderBottom = "1px solid #ccc";
        element.style.padding = "10px";
        element.style.cursor = "pointer";
        element.style.backgroundColor = email.read ? "white" : "lightgray";

        element.innerHTML = `
            <span class="sender"><strong>From:</strong> ${email.sender}</span>
            <span class="subject"><strong>Subject:</strong> ${email.subject}</span>
            <span class="timestamp"><strong>Timestamp:</strong> ${email.timestamp}</span>
          `;

        element.addEventListener("click", () => {
          load_email(email.id, mailbox);
          console.log("clicked", email.id);
          // Mark the email as read and change the background color
          if (!email.read) {
            fetch(`/emails/${email.id}`, {
              method: "PUT",
              body: JSON.stringify({
                read: true,
              }),
            }).then(() => {
              element.style.backgroundColor = "white";
            });
          }
        });
        document.querySelector("#emails-view").append(element);
      });
    });
}

function load_email(id) {
  // Show the email view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#email-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";

  // Fetch the email details
  fetch(`/emails/${id}`)
    .then((response) => response.json())
    .then((email) => {
      // Display the email details
      document.querySelector("#email-view").innerHTML = `
          <h3>${email.subject}</h3>
          <p><strong>From:</strong> ${email.sender}</p>
          <p><strong>To:</strong> ${email.recipients}</p>
          <p><strong>Timestamp:</strong> ${email.timestamp}</p>
          <hr>
          <p>${email.body}</p>
          <div style="text-align: end;">
            <button class="btn btn-sm" style="border-color: #aec3b0;" id="archive">
            <i class="bi bi-archive"></i> ${email.archived ? "Unarchive" : "Archive"}
            </button>
            <button class="btn btn-sm" style="border-color: #aec3b0;" id="reply">
            <i class="bi bi-reply"></i> Reply
            </button>
          </div>
          <div style="text-align: end; margin-top: 50px;">
            <button class="btn btn-sm" style="border-color: #aec3b0;" id="back">
            <i class="bi bi-arrow-left"></i> Go Back</button>
          </div>
          
        `;

      // Add go back button
      document.querySelector("#back").addEventListener("click", () => {
        load_mailbox("inbox");
      });

      // Add event listener to the archive button
      document.querySelector("#archive").addEventListener("click", () => {
        fetch(`/emails/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            archived: !email.archived,
          }),
        }).then(() => load_mailbox("inbox"));
      });

      // Add event listener to the reply button
      document.querySelector("#reply").addEventListener("click", () => {
        let subject = email.subject;
        if (!subject.startsWith("Re: ")) {
          subject = "Re: " + subject;
        }
        const body = `On ${email.timestamp}, ${email.sender} wrote:\n${email.body}\n`;
        compose_email(email.sender, subject, body);
      });
    });
}
