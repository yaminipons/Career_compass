import asyncio
import motor.motor_asyncio
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env")

client = motor.motor_asyncio.AsyncIOMotorClient(
    os.getenv("MONGO_URL"),
    tls=True,
    tlsAllowInvalidCertificates=True
)
database = client.career_advisor
careers_collection = database.get_collection("careers")

careers = [
    {
        "title": "Software Engineer",
        "tags": ["coding", "tech", "programming"],
        "streams": ["Science", "Commerce"],
        "required_skills": ["Python", "JavaScript", "DSA", "React", "SQL"],
        "top_courses": ["B.Tech CSE", "BCA", "B.Sc Computer Science"],
        "certifications": ["AWS Certified", "Google Cloud", "Meta Frontend"],
        "avg_salary": "8-25 LPA",
        "top_colleges": ["IIT", "NIT", "BITS Pilani", "VIT"],
        "job_outlook": "Very High demand, one of the fastest growing fields"
    },
    {
        "title": "Data Analyst",
        "tags": ["data", "analytics", "tech"],
        "streams": ["Science", "Commerce"],
        "required_skills": ["Python", "SQL", "Excel", "Power BI", "Statistics"],
        "top_courses": ["B.Tech CSE", "B.Sc Statistics", "BCA"],
        "certifications": ["Google Data Analytics", "IBM Data Analyst"],
        "avg_salary": "6-18 LPA",
        "top_colleges": ["IIT", "ISI Kolkata", "NIT", "Christ University"],
        "job_outlook": "High demand across all industries"
    },
    {
        "title": "UI/UX Designer",
        "tags": ["design", "creative", "tech"],
        "streams": ["Science", "Commerce", "Arts"],
        "required_skills": ["Figma", "Adobe XD", "User Research", "Prototyping"],
        "top_courses": ["B.Des", "BFA", "B.Tech CSE"],
        "certifications": ["Google UX Design", "Interaction Design Foundation"],
        "avg_salary": "5-15 LPA",
        "top_colleges": ["NID", "IIT (Design)", "Symbiosis", "MIT Pune"],
        "job_outlook": "Growing rapidly with every company needing digital products"
    },
    {
        "title": "Chartered Accountant",
        "tags": ["finance", "accounting", "commerce"],
        "streams": ["Commerce"],
        "required_skills": ["Accounting", "Taxation", "Tally", "Excel", "Auditing"],
        "top_courses": ["B.Com", "CA Foundation", "CA Intermediate"],
        "certifications": ["CA (ICAI)", "CPA", "CMA"],
        "avg_salary": "7-30 LPA",
        "top_colleges": ["SRCC", "Hindu College", "Loyola College"],
        "job_outlook": "Evergreen profession with stable demand"
    },
    {
        "title": "Product Manager",
        "tags": ["product", "management", "tech", "business"],
        "streams": ["Science", "Commerce"],
        "required_skills": ["Problem Solving", "Data Analysis", "Communication", "Agile", "SQL"],
        "top_courses": ["B.Tech", "BBA", "MBA"],
        "certifications": ["Google PM Certificate", "Pragmatic Institute"],
        "avg_salary": "12-35 LPA",
        "top_colleges": ["IIT", "IIM", "BITS", "SP Jain"],
        "job_outlook": "One of the highest paying roles in tech companies"
    },
    {
        "title": "Cybersecurity Analyst",
        "tags": ["security", "tech", "coding"],
        "streams": ["Science"],
        "required_skills": ["Networking", "Linux", "Python", "Ethical Hacking", "Firewalls"],
        "top_courses": ["B.Tech CSE", "B.Sc IT", "BCA"],
        "certifications": ["CEH", "CompTIA Security+", "CISSP"],
        "avg_salary": "6-20 LPA",
        "top_colleges": ["IIT", "NIT", "BITS", "Manipal"],
        "job_outlook": "Extremely high demand due to rising cyber threats"
    },
    {
        "title": "Doctor (MBBS)",
        "tags": ["healthcare", "medicine", "biology"],
        "streams": ["Science"],
        "required_skills": ["Biology", "Chemistry", "Patient Care", "Anatomy"],
        "top_courses": ["MBBS", "BDS", "BAMS"],
        "certifications": ["USMLE (for US)", "MCI Registration"],
        "avg_salary": "8-50 LPA",
        "top_colleges": ["AIIMS", "CMC Vellore", "JIPMER", "KMC Manipal"],
        "job_outlook": "Always in demand, highly respected profession"
    },
    {
        "title": "Lawyer",
        "tags": ["law", "justice", "arts", "communication"],
        "streams": ["Arts", "Commerce", "Science"],
        "required_skills": ["Communication", "Critical Thinking", "Research", "Writing"],
        "top_courses": ["BA LLB", "BBA LLB", "LLB"],
        "certifications": ["Bar Council Registration", "LLM"],
        "avg_salary": "5-40 LPA",
        "top_colleges": ["NLU Delhi", "NALSAR", "NLU Mumbai", "Symbiosis Law"],
        "job_outlook": "Stable demand especially in corporate and criminal law"
    },
    {
        "title": "Graphic Designer",
        "tags": ["design", "creative", "arts"],
        "streams": ["Arts", "Commerce", "Science"],
        "required_skills": ["Photoshop", "Illustrator", "Typography", "Color Theory"],
        "top_courses": ["B.Des", "BFA", "Diploma in Graphic Design"],
        "certifications": ["Adobe Certified", "Canva Design School"],
        "avg_salary": "3-12 LPA",
        "top_colleges": ["NID", "Pearl Academy", "MIT Institute of Design"],
        "job_outlook": "High demand in advertising, media and startups"
    },
    {
        "title": "AI/ML Engineer",
        "tags": ["coding", "tech", "data", "ai"],
        "streams": ["Science"],
        "required_skills": ["Python", "TensorFlow", "Machine Learning", "Statistics", "DSA"],
        "top_courses": ["B.Tech CSE", "B.Sc Data Science", "M.Tech AI"],
        "certifications": ["DeepLearning.AI", "Google ML", "AWS ML Specialty"],
        "avg_salary": "10-40 LPA",
        "top_colleges": ["IIT", "IISc", "NIT", "BITS"],
        "job_outlook": "Fastest growing field in the world right now"
    },
    {
        "title": "Investment Banker",
        "tags": ["finance", "banking", "commerce"],
        "streams": ["Commerce", "Science"],
        "required_skills": ["Financial Modeling", "Excel", "Valuation", "Communication"],
        "top_courses": ["BBA Finance", "B.Com", "MBA Finance"],
        "certifications": ["CFA", "FRM", "NISM"],
        "avg_salary": "10-50 LPA",
        "top_colleges": ["IIM", "SP Jain", "NMIMS", "FMS Delhi"],
        "job_outlook": "High earning potential, very competitive field"
    },
    {
        "title": "Journalist",
        "tags": ["media", "writing", "arts", "communication"],
        "streams": ["Arts", "Commerce"],
        "required_skills": ["Writing", "Research", "Communication", "Video Editing"],
        "top_courses": ["BA Journalism", "BMM", "MA Mass Communication"],
        "certifications": ["NCTJ Diploma", "Reuters Journalism"],
        "avg_salary": "3-15 LPA",
        "top_colleges": ["IIMC", "ACJ Chennai", "Symbiosis", "XIC Mumbai"],
        "job_outlook": "Evolving field with digital media creating new opportunities"
    },
    {
        "title": "Cloud Architect",
        "tags": ["tech", "coding", "cloud"],
        "streams": ["Science"],
        "required_skills": ["AWS", "Azure", "Networking", "Linux", "DevOps"],
        "top_courses": ["B.Tech CSE", "B.Sc IT"],
        "certifications": ["AWS Solutions Architect", "Google Cloud Architect", "Azure Architect"],
        "avg_salary": "15-45 LPA",
        "top_colleges": ["IIT", "NIT", "BITS", "VIT"],
        "job_outlook": "Very high demand as companies move to cloud"
    },
    {
        "title": "Marketing Manager",
        "tags": ["marketing", "business", "commerce", "creative"],
        "streams": ["Commerce", "Arts"],
        "required_skills": ["Digital Marketing", "SEO", "Content Writing", "Analytics", "Social Media"],
        "top_courses": ["BBA Marketing", "B.Com", "MBA Marketing"],
        "certifications": ["Google Digital Marketing", "HubSpot Marketing", "Meta Blueprint"],
        "avg_salary": "5-20 LPA",
        "top_colleges": ["IIM", "MICA Ahmedabad", "Symbiosis", "Christ University"],
        "job_outlook": "Essential role in every company, especially startups"
    },
    {
        "title": "Content Creator",
        "tags": ["creative", "media", "arts", "social media"],
        "streams": ["Arts", "Commerce", "Science"],
        "required_skills": ["Video Editing", "Writing", "Social Media", "Photography", "Storytelling"],
        "top_courses": ["BMM", "BA Media", "BFA"],
        "certifications": ["YouTube Creator Academy", "Meta Content Marketing"],
        "avg_salary": "3-20 LPA",
        "top_colleges": ["Whistling Woods", "FTII", "Symbiosis", "Pearl Academy"],
        "job_outlook": "Booming field with massive growth in digital media"
    }
]

async def seed():
    # Clear existing careers
    await careers_collection.delete_many({})
    # Insert all careers
    await careers_collection.insert_many(careers)
    print(f"✅ Successfully seeded {len(careers)} careers!")

asyncio.run(seed())