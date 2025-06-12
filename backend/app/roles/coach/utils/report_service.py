from jinja2 import Environment, FileSystemLoader
#from weasyprint import HTML
from pathlib import Path
import tempfile


env = Environment(loader=FileSystemLoader("app/roles/coach/templates")) 

def generate_pdf_report(data: dict) -> Path:
    template = env.get_template("attendance_report.html")
    # html_content = template.render(**data)

    # # временный файл
    # with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
    #     HTML(string=html_content).write_pdf(tmp_file.name)
    #     return Path(tmp_file.name)
