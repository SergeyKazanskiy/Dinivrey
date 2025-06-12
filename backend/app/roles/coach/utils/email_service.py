from email.message import EmailMessage
from aiosmtplib import send
from pathlib import Path
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


async def send_email_with_pdf(to_email: str, pdf_path: Path):
    msg = EmailMessage()
    msg["Subject"] = "Attendance Report"
    msg["From"] = "sergeykazanskiy74@gmail.com"
    msg["To"] = to_email
    msg.set_content("Attached is the attendance report.")

    with open(pdf_path, "rb") as f:
        pdf_data = f.read()
    msg.add_attachment(pdf_data, maintype="application", subtype="pdf", filename=pdf_path.name)

    await send(
        msg,
        hostname="smtp.gmail.com",
        port=587,
        username="sergeykazanskiy74@gmail.com",
        password="yyeu rfth ccqu wnct",
        use_tls=False,
    )


async def send_html_email(to_email: str, html_body: str):
    # Параметры SMTP (для Gmail)
    smtp_server = "smtp.gmail.com"
    smtp_port = 465
    sender_email = "sergeykazanskiy74@gmail.com"
    sender_password = "yyeu rfth ccqu wnct"  # Используй App Password, см. ниже

    # Создание MIME сообщения
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Attendance Report"
    msg["From"] = sender_email
    msg["To"] = to_email

    # Вставляем HTML как тело письма
    html_part = MIMEText(html_body, "html")
    msg.attach(html_part)

    # Отправка
    with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
        server.login(sender_email, sender_password)
        server.send_message(msg)

    print("!!! Email sent successfully.")
