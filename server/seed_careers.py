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
    # ── TECH ──────────────────────────────────────────────
    {
        "title": "Software Engineer",
        "tags": ["coding", "tech", "programming"],
        "streams": ["Science", "Commerce"],
        "required_skills": ["Python", "JavaScript", "DSA", "React", "SQL"],
        "top_courses": ["B.Tech CSE", "BCA", "B.Sc Computer Science"],
        "certifications": ["AWS Certified", "Google Cloud", "Meta Frontend"],
        "avg_salary": "8-25 LPA",
        "top_colleges": [
            "IIT Bombay", "IIT Delhi", "IIT Madras",
            "NIT Trichy", "NIT Warangal", "BITS Pilani",
            "VIT Vellore", "Manipal Institute", "SRM Chennai",
            "DTU Delhi", "IIIT Hyderabad", "Christ University"
        ],
        "job_outlook": "Very high demand, one of the fastest growing fields"
    },
    {
        "title": "Data Analyst",
        "tags": ["data", "analytics", "tech"],
        "streams": ["Science", "Commerce"],
        "required_skills": ["Python", "SQL", "Excel", "Power BI", "Statistics"],
        "top_courses": ["B.Tech CSE", "B.Sc Statistics", "BCA"],
        "certifications": ["Google Data Analytics", "IBM Data Analyst"],
        "avg_salary": "6-18 LPA",
        "top_colleges": [
            "ISI Kolkata", "IIT Bombay", "IIT Delhi",
            "Christ University Bangalore", "Loyola College Chennai",
            "Fergusson College Pune", "St. Xavier's Mumbai",
            "Hindu College Delhi", "Presidency University Kolkata",
            "Madras Christian College", "Stella Maris College"
        ],
        "job_outlook": "High demand across all industries"
    },
    {
        "title": "AI/ML Engineer",
        "tags": ["coding", "tech", "data", "ai"],
        "streams": ["Science"],
        "required_skills": ["Python", "TensorFlow", "Machine Learning", "Statistics", "DSA"],
        "top_courses": ["B.Tech CSE", "B.Sc Data Science", "M.Tech AI"],
        "certifications": ["DeepLearning.AI", "Google ML", "AWS ML Specialty"],
        "avg_salary": "10-40 LPA",
        "top_colleges": [
            "IIT Bombay", "IIT Delhi", "IIT Madras",
            "IISc Bangalore", "IIT Kharagpur", "IIT Roorkee",
            "IIIT Hyderabad", "IIIT Bangalore", "NIT Trichy",
            "BITS Pilani", "Amrita University", "PSG Tech Coimbatore"
        ],
        "job_outlook": "Fastest growing field in the world right now"
    },
    {
        "title": "Cybersecurity Analyst",
        "tags": ["security", "tech", "coding"],
        "streams": ["Science"],
        "required_skills": ["Networking", "Linux", "Python", "Ethical Hacking", "Firewalls"],
        "top_courses": ["B.Tech CSE", "B.Sc IT", "BCA"],
        "certifications": ["CEH", "CompTIA Security+", "CISSP"],
        "avg_salary": "6-20 LPA",
        "top_colleges": [
            "IIT Madras", "IIT Bombay", "NIT Warangal",
            "BITS Pilani Goa", "Manipal Institute", "VIT Vellore",
            "Amrita University", "SRM Chennai", "Thapar University",
            "Chandigarh University", "LPU Phagwara", "Symbiosis Pune"
        ],
        "job_outlook": "Extremely high demand due to rising cyber threats"
    },
    {
        "title": "Cloud Architect",
        "tags": ["tech", "coding", "cloud"],
        "streams": ["Science"],
        "required_skills": ["AWS", "Azure", "Networking", "Linux", "DevOps"],
        "top_courses": ["B.Tech CSE", "B.Sc IT"],
        "certifications": ["AWS Solutions Architect", "Google Cloud Architect", "Azure Architect"],
        "avg_salary": "15-45 LPA",
        "top_colleges": [
            "IIT Bombay", "IIT Delhi", "BITS Pilani",
            "NIT Trichy", "VIT Vellore", "Manipal Institute",
            "DTU Delhi", "IIIT Hyderabad", "Thapar University",
            "Amity University Noida", "Chandigarh University"
        ],
        "job_outlook": "Very high demand as companies move to cloud"
    },
    {
        "title": "UI/UX Designer",
        "tags": ["design", "creative", "tech"],
        "streams": ["Science", "Commerce", "Arts"],
        "required_skills": ["Figma", "Adobe XD", "User Research", "Prototyping"],
        "top_courses": ["B.Des", "BFA", "B.Tech CSE"],
        "certifications": ["Google UX Design", "Interaction Design Foundation"],
        "avg_salary": "5-15 LPA",
        "top_colleges": [
            "NID Ahmedabad", "IIT Bombay IDC", "IIT Delhi DSC",
            "MIT Institute of Design Pune", "Symbiosis Pune",
            "Pearl Academy Delhi", "NIFT Delhi", "Srishti Bangalore",
            "Unitedworld Ahmedabad", "Amity School of Design",
            "RV College Bangalore", "MAEER MIT Pune"
        ],
        "job_outlook": "Growing rapidly with every company needing digital products"
    },
    {
        "title": "DevOps Engineer",
        "tags": ["tech", "coding", "cloud"],
        "streams": ["Science"],
        "required_skills": ["Linux", "Docker", "Kubernetes", "AWS", "Python"],
        "top_courses": ["B.Tech CSE", "B.Sc IT"],
        "certifications": ["AWS DevOps", "Docker Certified", "Kubernetes CKA"],
        "avg_salary": "10-30 LPA",
        "top_colleges": [
            "IIT Bombay", "IIT Madras", "NIT Trichy",
            "BITS Pilani", "VIT Vellore", "Manipal Institute",
            "DTU Delhi", "Thapar University", "SRM Chennai",
            "Amrita University", "PSG Tech Coimbatore"
        ],
        "job_outlook": "High demand in every software company"
    },
    {
        "title": "Blockchain Developer",
        "tags": ["tech", "coding", "blockchain"],
        "streams": ["Science"],
        "required_skills": ["Solidity", "JavaScript", "Python", "Cryptography", "DSA"],
        "top_courses": ["B.Tech CSE", "BCA"],
        "certifications": ["Certified Blockchain Developer", "Ethereum Developer"],
        "avg_salary": "10-35 LPA",
        "top_colleges": [
            "IIT Bombay", "IIT Delhi", "BITS Pilani",
            "NIT Warangal", "VIT Vellore", "Manipal Institute",
            "IIIT Hyderabad", "Amity University", "LPU Phagwara",
            "Chandigarh University", "Symbiosis Pune"
        ],
        "job_outlook": "Emerging field with very high pay and low competition"
    },
    {
        "title": "Full Stack Developer",
        "tags": ["coding", "tech", "programming"],
        "streams": ["Science", "Commerce"],
        "required_skills": ["React", "Node.js", "SQL", "JavaScript", "Python"],
        "top_courses": ["B.Tech CSE", "BCA", "B.Sc Computer Science"],
        "certifications": ["Meta Full Stack", "IBM Full Stack", "freeCodeCamp"],
        "avg_salary": "7-22 LPA",
        "top_colleges": [
            "IIT Bombay", "NIT Trichy", "BITS Pilani",
            "VIT Vellore", "SRM Chennai", "Manipal Institute",
            "DTU Delhi", "Thapar University", "Christ University",
            "Amrita University", "PSG Tech Coimbatore", "KL University"
        ],
        "job_outlook": "One of the most hired roles at startups and product companies"
    },
    {
        "title": "Game Developer",
        "tags": ["coding", "tech", "creative", "gaming"],
        "streams": ["Science", "Arts"],
        "required_skills": ["Unity", "C++", "JavaScript", "3D Modeling", "DSA"],
        "top_courses": ["B.Tech CSE", "B.Sc Animation", "BCA"],
        "certifications": ["Unity Certified", "Unreal Engine Developer"],
        "avg_salary": "5-18 LPA",
        "top_colleges": [
            "MAAC Institute", "Arena Animation", "Frameboxx",
            "IIT Bombay", "MIT Pune", "Whistling Woods Mumbai",
            "Pearl Academy Delhi", "Amity University Noida",
            "Symbiosis Pune", "LPU Phagwara", "Chandigarh University"
        ],
        "job_outlook": "Booming industry with India's gaming market growing rapidly"
    },

    # ── FINANCE & COMMERCE ─────────────────────────────────
    {
        "title": "Chartered Accountant",
        "tags": ["finance", "accounting", "commerce"],
        "streams": ["Commerce"],
        "required_skills": ["Accounting", "Taxation", "Tally", "Excel", "Auditing"],
        "top_courses": ["B.Com", "CA Foundation", "CA Intermediate"],
        "certifications": ["CA (ICAI)", "CPA", "CMA"],
        "avg_salary": "7-30 LPA",
        "top_colleges": [
            "SRCC Delhi", "Hindu College Delhi", "Loyola College Chennai",
            "St. Xavier's Mumbai", "Christ University Bangalore",
            "Presidency College Kolkata", "Narsee Monjee Mumbai",
            "Symbiosis Pune", "NMIMS Mumbai", "Mithibai College Mumbai",
            "St. Joseph's Bangalore", "Madras Christian College"
        ],
        "job_outlook": "Evergreen profession with stable demand"
    },
    {
        "title": "Investment Banker",
        "tags": ["finance", "banking", "commerce"],
        "streams": ["Commerce", "Science"],
        "required_skills": ["Financial Modeling", "Excel", "Valuation", "Communication"],
        "top_courses": ["BBA Finance", "B.Com", "MBA Finance"],
        "certifications": ["CFA", "FRM", "NISM"],
        "avg_salary": "10-50 LPA",
        "top_colleges": [
            "IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta",
            "SP Jain Mumbai", "NMIMS Mumbai", "FMS Delhi",
            "MDI Gurgaon", "XLRI Jamshedpur", "ISB Hyderabad",
            "Symbiosis Pune", "TAPMI Manipal", "Great Lakes Chennai"
        ],
        "job_outlook": "High earning potential, very competitive field"
    },
    {
        "title": "Financial Analyst",
        "tags": ["finance", "analytics", "commerce"],
        "streams": ["Commerce", "Science"],
        "required_skills": ["Excel", "Financial Modeling", "SQL", "Statistics", "Accounting"],
        "top_courses": ["B.Com", "BBA Finance", "MBA Finance"],
        "certifications": ["CFA Level 1", "FRM", "Bloomberg Market Concepts"],
        "avg_salary": "6-20 LPA",
        "top_colleges": [
            "SRCC Delhi", "Christ University Bangalore", "Loyola College Chennai",
            "St. Xavier's Mumbai", "NMIMS Mumbai", "Narsee Monjee Mumbai",
            "Symbiosis Pune", "IIM Indore", "FMS Delhi",
            "Hindu College Delhi", "Fergusson College Pune"
        ],
        "job_outlook": "Steady demand across banks, consulting and corporates"
    },
    {
        "title": "Stock Market Trader",
        "tags": ["finance", "trading", "commerce"],
        "streams": ["Commerce", "Science"],
        "required_skills": ["Financial Modeling", "Excel", "Statistics", "Risk Management"],
        "top_courses": ["B.Com", "BBA Finance", "MBA Finance"],
        "certifications": ["NISM Series", "NSE Certification", "CFA"],
        "avg_salary": "5-40 LPA",
        "top_colleges": [
            "SRCC Delhi", "NMIMS Mumbai", "SP Jain Mumbai",
            "Narsee Monjee Mumbai", "Christ University Bangalore",
            "IIM Indore", "Symbiosis Pune", "FMS Delhi",
            "Jamnalal Bajaj Mumbai", "Shailesh J. Mehta School IIT Bombay"
        ],
        "job_outlook": "High risk high reward, growing with retail investor boom"
    },
    {
        "title": "Product Manager",
        "tags": ["product", "management", "tech", "business"],
        "streams": ["Science", "Commerce"],
        "required_skills": ["Problem Solving", "SQL", "Communication", "Agile", "Data Analysis"],
        "top_courses": ["B.Tech", "BBA", "MBA"],
        "certifications": ["Google PM Certificate", "Pragmatic Institute"],
        "avg_salary": "12-35 LPA",
        "top_colleges": [
            "IIT Bombay", "IIT Delhi", "IIM Ahmedabad",
            "IIM Bangalore", "BITS Pilani", "ISB Hyderabad",
            "SP Jain Mumbai", "MDI Gurgaon", "XLRI Jamshedpur",
            "NIT Trichy", "DTU Delhi", "Symbiosis Pune"
        ],
        "job_outlook": "One of the highest paying roles in tech companies"
    },
    {
        "title": "Marketing Manager",
        "tags": ["marketing", "business", "commerce", "creative"],
        "streams": ["Commerce", "Arts"],
        "required_skills": ["Digital Marketing", "SEO", "Content Writing", "Analytics", "Social Media"],
        "top_courses": ["BBA Marketing", "B.Com", "MBA Marketing"],
        "certifications": ["Google Digital Marketing", "HubSpot Marketing", "Meta Blueprint"],
        "avg_salary": "5-20 LPA",
        "top_colleges": [
            "MICA Ahmedabad", "IIM Ahmedabad", "IIM Bangalore",
            "Symbiosis Pune", "Christ University Bangalore",
            "Narsee Monjee Mumbai", "Amity University Noida",
            "NMIMS Mumbai", "Manipal Institute", "St. Xavier's Mumbai",
            "Loyola College Chennai", "Mudra Institute Ahmedabad"
        ],
        "job_outlook": "Essential role in every company especially startups"
    },
    {
        "title": "Human Resources Manager",
        "tags": ["management", "business", "commerce", "communication"],
        "streams": ["Commerce", "Arts"],
        "required_skills": ["Communication", "Excel", "Recruitment", "Labor Laws", "Leadership"],
        "top_courses": ["BBA HR", "MBA HR", "B.Com"],
        "certifications": ["SHRM", "HRCI", "Diploma in HRM"],
        "avg_salary": "4-15 LPA",
        "top_colleges": [
            "XLRI Jamshedpur", "Tata Institute of Social Sciences Mumbai",
            "Symbiosis Pune", "Christ University Bangalore",
            "Amity University Noida", "IIM Ahmedabad",
            "MDI Gurgaon", "XIMB Bhubaneswar", "IMT Ghaziabad",
            "Loyola College Chennai", "St. Joseph's Bangalore"
        ],
        "job_outlook": "Stable demand in every organization"
    },

    # ── HEALTHCARE ─────────────────────────────────────────
    {
        "title": "Doctor (MBBS)",
        "tags": ["healthcare", "medicine", "biology"],
        "streams": ["Science"],
        "required_skills": ["Biology", "Chemistry", "Patient Care", "Anatomy"],
        "top_courses": ["MBBS", "BDS", "BAMS"],
        "certifications": ["MCI Registration", "USMLE (for US)"],
        "avg_salary": "8-50 LPA",
        "top_colleges": [
            "AIIMS Delhi", "AIIMS Jodhpur", "AIIMS Bhopal",
            "CMC Vellore", "JIPMER Puducherry", "KMC Manipal",
            "Maulana Azad Medical College Delhi", "Grant Medical College Mumbai",
            "B.J. Medical College Ahmedabad", "Madras Medical College",
            "Osmania Medical College Hyderabad", "MS Ramaiah Bangalore"
        ],
        "job_outlook": "Always in demand, highly respected profession"
    },
    {
        "title": "Pharmacist",
        "tags": ["healthcare", "medicine", "science"],
        "streams": ["Science"],
        "required_skills": ["Chemistry", "Biology", "Pharmacology", "Patient Care"],
        "top_courses": ["B.Pharm", "M.Pharm", "Pharm.D"],
        "certifications": ["PCI Registration", "GPAT"],
        "avg_salary": "3-12 LPA",
        "top_colleges": [
            "JSS College of Pharmacy Mysore", "Manipal College of Pharmacy",
            "Jamia Hamdard Delhi", "Bombay College of Pharmacy",
            "SRM College of Pharmacy Chennai", "Amrita School of Pharmacy",
            "PSG College of Pharmacy Coimbatore", "KLE College of Pharmacy Belgaum",
            "Poona College of Pharmacy", "BITS Pilani Pharmacy"
        ],
        "job_outlook": "Stable demand in hospitals, retail and pharma industry"
    },
    {
        "title": "Biotech Researcher",
        "tags": ["science", "research", "healthcare", "biology"],
        "streams": ["Science"],
        "required_skills": ["Biology", "Chemistry", "Lab Skills", "Statistics", "Python"],
        "top_courses": ["B.Sc Biotechnology", "M.Sc Biotechnology", "B.Tech Biotech"],
        "certifications": ["CSIR NET", "DBT JRF", "GATE Biotech"],
        "avg_salary": "4-15 LPA",
        "top_colleges": [
            "IISc Bangalore", "IIT Delhi", "IIT Bombay",
            "JNU Delhi", "BHU Varanasi", "Jadavpur University",
            "University of Hyderabad", "Anna University Chennai",
            "Amrita University", "VIT Vellore", "SRM Chennai",
            "Manipal Institute"
        ],
        "job_outlook": "Growing with India's push in pharma and biotech sectors"
    },
    {
        "title": "Psychologist",
        "tags": ["healthcare", "counseling", "arts", "social work"],
        "streams": ["Arts", "Science"],
        "required_skills": ["Communication", "Empathy", "Research", "Counseling", "Writing"],
        "top_courses": ["B.A Psychology", "M.A Psychology", "M.Sc Clinical Psychology"],
        "certifications": ["RCI Registration", "Counseling Certification"],
        "avg_salary": "3-12 LPA",
        "top_colleges": [
            "NIMHANS Bangalore", "Tata Institute of Social Sciences Mumbai",
            "Delhi University", "Christ University Bangalore",
            "Fergusson College Pune", "Loyola College Chennai",
            "St. Xavier's Mumbai", "Amity University Noida",
            "Manipal University", "Presidency University Kolkata",
            "Madras Christian College", "Panjab University Chandigarh"
        ],
        "job_outlook": "Growing rapidly with increasing mental health awareness"
    },
    {
        "title": "Nutritionist & Dietitian",
        "tags": ["healthcare", "wellness", "science"],
        "streams": ["Science", "Arts"],
        "required_skills": ["Biology", "Chemistry", "Communication", "Meal Planning"],
        "top_courses": ["B.Sc Nutrition", "B.Sc Home Science", "M.Sc Dietetics"],
        "certifications": ["RD Certification", "Sports Nutrition", "IDA Membership"],
        "avg_salary": "3-10 LPA",
        "top_colleges": [
            "Lady Irwin College Delhi", "SNDT University Mumbai",
            "Manipal Institute", "SRM Chennai",
            "Avinashilingam University Coimbatore", "Amrita University",
            "Mount Carmel College Bangalore", "Isabella Thoburn College Lucknow",
            "Stella Maris College Chennai", "Fatima College Madurai"
        ],
        "job_outlook": "Rising demand with growing health consciousness in India"
    },

    # ── ARTS & MEDIA ────────────────────────────────────────
    {
        "title": "Lawyer",
        "tags": ["law", "justice", "arts", "communication"],
        "streams": ["Arts", "Commerce", "Science"],
        "required_skills": ["Communication", "Critical Thinking", "Research", "Writing"],
        "top_courses": ["BA LLB", "BBA LLB", "LLB"],
        "certifications": ["Bar Council Registration", "LLM"],
        "avg_salary": "5-40 LPA",
        "top_colleges": [
            "NLU Delhi (NLUD)", "NALSAR Hyderabad", "NLU Mumbai (MNLU)",
            "NLU Bangalore (NLSIU)", "NLU Jodhpur", "NLU Kolkata (NUJS)",
            "Symbiosis Law School Pune", "Amity Law School Delhi",
            "Christ University Bangalore", "Faculty of Law Delhi University",
            "ILS Law College Pune", "Government Law College Mumbai"
        ],
        "job_outlook": "Stable demand especially in corporate and criminal law"
    },
    {
        "title": "Journalist",
        "tags": ["media", "writing", "arts", "communication"],
        "streams": ["Arts", "Commerce"],
        "required_skills": ["Writing", "Research", "Communication", "Video Editing"],
        "top_courses": ["BA Journalism", "BMM", "MA Mass Communication"],
        "certifications": ["NCTJ Diploma", "Reuters Journalism"],
        "avg_salary": "3-15 LPA",
        "top_colleges": [
            "IIMC Delhi", "ACJ Chennai", "XIC Mumbai",
            "Symbiosis Pune", "Jamia Millia Islamia Delhi",
            "Jadavpur University Kolkata", "Manipal Institute",
            "Amity School of Communication Noida", "Christ University Bangalore",
            "St. Xavier's Mumbai", "Madras Christian College",
            "Lady Shri Ram College Delhi"
        ],
        "job_outlook": "Evolving field with digital media creating new opportunities"
    },
    {
        "title": "Graphic Designer",
        "tags": ["design", "creative", "arts"],
        "streams": ["Arts", "Commerce", "Science"],
        "required_skills": ["Photoshop", "Illustrator", "Typography", "Color Theory"],
        "top_courses": ["B.Des", "BFA", "Diploma in Graphic Design"],
        "certifications": ["Adobe Certified", "Canva Design School"],
        "avg_salary": "3-12 LPA",
        "top_colleges": [
            "NID Ahmedabad", "Pearl Academy Delhi", "MIT Institute of Design Pune",
            "Srishti Bangalore", "Symbiosis Pune", "NIFT Delhi",
            "Amity School of Design Noida", "Unitedworld Ahmedabad",
            "JD Institute of Fashion Mumbai", "Vogue Institute Bangalore",
            "Arena Animation", "MAAC Institute"
        ],
        "job_outlook": "High demand in advertising, media and startups"
    },
    {
        "title": "Content Creator",
        "tags": ["creative", "media", "arts", "social media"],
        "streams": ["Arts", "Commerce", "Science"],
        "required_skills": ["Video Editing", "Writing", "Social Media", "Photography", "Storytelling"],
        "top_courses": ["BMM", "BA Media", "BFA"],
        "certifications": ["YouTube Creator Academy", "Meta Content Marketing"],
        "avg_salary": "3-20 LPA",
        "top_colleges": [
            "Whistling Woods Mumbai", "FTII Pune",
            "Symbiosis Pune", "Pearl Academy Delhi",
            "Amity School of Communication Noida", "Christ University Bangalore",
            "Manipal Institute", "Satyajit Ray Film Institute Kolkata",
            "AJK Mass Communication Delhi", "Jamia Millia Delhi",
            "St. Xavier's Mumbai", "Madras Christian College"
        ],
        "job_outlook": "Booming field with massive growth in digital media"
    },
    {
        "title": "Film Director",
        "tags": ["creative", "media", "arts", "storytelling"],
        "streams": ["Arts"],
        "required_skills": ["Storytelling", "Video Editing", "Communication", "Photography"],
        "top_courses": ["B.A Film Studies", "Direction Course", "BFA"],
        "certifications": ["FTII Diploma", "Whistling Woods Certification"],
        "avg_salary": "5-50 LPA",
        "top_colleges": [
            "FTII Pune", "Whistling Woods Mumbai",
            "Satyajit Ray Film Institute Kolkata", "AJK Mass Communication Delhi",
            "Symbiosis Pune", "LV Prasad Film Academy Chennai",
            "Annapurna College Hyderabad", "MGR Government Film Institute Chennai",
            "Asian Academy of Film Mumbai", "Digital Academy of Film Mumbai"
        ],
        "job_outlook": "Competitive but high reward with OTT platforms creating opportunities"
    },
    {
        "title": "Fashion Designer",
        "tags": ["design", "creative", "arts", "fashion"],
        "streams": ["Arts", "Commerce"],
        "required_skills": ["Sketching", "Photoshop", "Textile Knowledge", "Creativity"],
        "top_courses": ["B.Des Fashion", "B.Sc Fashion Design", "Diploma in Fashion"],
        "certifications": ["NIFT Certification", "Pearl Academy Diploma"],
        "avg_salary": "3-15 LPA",
        "top_colleges": [
            "NIFT Delhi", "NIFT Mumbai", "NIFT Chennai",
            "NIFT Bangalore", "Pearl Academy Delhi", "NID Ahmedabad",
            "Symbiosis Pune", "JD Institute Mumbai", "Amity University Noida",
            "Vogue Institute Bangalore", "INIFD Pune", "Hamstech Hyderabad"
        ],
        "job_outlook": "Growing with India's fashion and textile industry boom"
    },
    {
        "title": "Architect",
        "tags": ["design", "creative", "science", "arts"],
        "streams": ["Science", "Arts"],
        "required_skills": ["AutoCAD", "Sketching", "3D Modeling", "Mathematics"],
        "top_courses": ["B.Arch", "M.Arch"],
        "certifications": ["COA Registration", "LEED Certification"],
        "avg_salary": "4-20 LPA",
        "top_colleges": [
            "IIT Roorkee", "IIT Kharagpur", "CEPT Ahmedabad",
            "SPA Delhi", "SPA Bhopal", "Manipal School of Architecture",
            "Chandigarh College of Architecture", "RV College Bangalore",
            "Rizvi College Mumbai", "BMS College Bangalore",
            "Kamla Raheja Vidyanidhi Mumbai", "LBS College of Architecture Mumbai"
        ],
        "job_outlook": "Stable demand with India's infrastructure growth"
    },

    # ── EDUCATION & SOCIAL ──────────────────────────────────
    {
        "title": "Teacher / Educator",
        "tags": ["teaching", "education", "arts", "social work"],
        "streams": ["Arts", "Science", "Commerce"],
        "required_skills": ["Communication", "Subject Knowledge", "Patience", "Writing"],
        "top_courses": ["B.Ed", "B.A + B.Ed", "M.Ed"],
        "certifications": ["CTET", "TET", "NET"],
        "avg_salary": "3-12 LPA",
        "top_colleges": [
            "NCERT New Delhi", "Jamia Millia Islamia Delhi",
            "Delhi University", "BHU Varanasi",
            "Panjab University Chandigarh", "Jadavpur University Kolkata",
            "Osmania University Hyderabad", "Annamalai University Tamil Nadu",
            "Amity University Noida", "Christ University Bangalore",
            "Lovely Professional University Punjab", "Manipal University"
        ],
        "job_outlook": "Always in demand with government and private sectors"
    },
    {
        "title": "Social Worker / NGO Professional",
        "tags": ["social work", "arts", "communication", "teaching"],
        "streams": ["Arts", "Commerce"],
        "required_skills": ["Communication", "Empathy", "Research", "Leadership", "Writing"],
        "top_courses": ["B.SW", "M.SW", "BA Sociology"],
        "certifications": ["TISS Certification", "Red Cross Training"],
        "avg_salary": "3-10 LPA",
        "top_colleges": [
            "Tata Institute of Social Sciences Mumbai", "Delhi School of Social Work",
            "JNU Delhi", "Jamia Millia Islamia Delhi",
            "Loyola College of Social Sciences Thiruvananthapuram",
            "Madras School of Social Work Chennai",
            "St. Xavier's College of Social Work Rajkot",
            "Nirmala Niketan Mumbai", "Indore School of Social Work",
            "BHU Varanasi", "Osmania University Hyderabad"
        ],
        "job_outlook": "Growing with increasing CSR and NGO sector in India"
    },

    # ── ENGINEERING & CORE ──────────────────────────────────
    {
        "title": "Mechanical Engineer",
        "tags": ["engineering", "science", "manufacturing"],
        "streams": ["Science"],
        "required_skills": ["AutoCAD", "Mathematics", "Thermodynamics", "SolidWorks"],
        "top_courses": ["B.Tech Mechanical", "B.E Mechanical"],
        "certifications": ["AutoCAD Certified", "Six Sigma", "PMP"],
        "avg_salary": "4-15 LPA",
        "top_colleges": [
            "IIT Madras", "IIT Bombay", "IIT Delhi",
            "NIT Trichy", "NIT Warangal", "BITS Pilani",
            "VIT Vellore", "Thapar University", "PSG Tech Coimbatore",
            "Jadavpur University Kolkata", "Amrita University",
            "College of Engineering Pune (COEP)"
        ],
        "job_outlook": "Stable demand in manufacturing, auto and aerospace sectors"
    },
    {
        "title": "Civil Engineer",
        "tags": ["engineering", "science", "construction"],
        "streams": ["Science"],
        "required_skills": ["AutoCAD", "Mathematics", "Structural Analysis", "Project Management"],
        "top_courses": ["B.Tech Civil", "B.E Civil"],
        "certifications": ["AutoCAD Certified", "PMP", "LEED"],
        "avg_salary": "4-15 LPA",
        "top_colleges": [
            "IIT Roorkee", "IIT Madras", "IIT Bombay",
            "NIT Trichy", "NIT Calicut", "BITS Pilani",
            "College of Engineering Pune (COEP)", "Jadavpur University Kolkata",
            "Anna University Chennai", "BMS College Bangalore",
            "Thapar University", "SRM Chennai"
        ],
        "job_outlook": "High demand with India's infrastructure boom"
    },
    {
        "title": "Electrical Engineer",
        "tags": ["engineering", "science", "electronics"],
        "streams": ["Science"],
        "required_skills": ["Circuit Design", "Mathematics", "MATLAB", "Python"],
        "top_courses": ["B.Tech EEE", "B.Tech ECE"],
        "certifications": ["GATE EE", "IEEE Certification", "PLC Certification"],
        "avg_salary": "4-16 LPA",
        "top_colleges": [
            "IIT Bombay", "IIT Madras", "IIT Delhi",
            "NIT Trichy", "NIT Warangal", "BITS Pilani",
            "Jadavpur University Kolkata", "Anna University Chennai",
            "PSG Tech Coimbatore", "Amrita University",
            "College of Engineering Pune (COEP)", "VIT Vellore"
        ],
        "job_outlook": "Growing with EV and renewable energy sectors"
    },

    # ── EMERGING & OTHERS ───────────────────────────────────
    {
        "title": "Data Scientist",
        "tags": ["data", "tech", "ai", "analytics"],
        "streams": ["Science"],
        "required_skills": ["Python", "Machine Learning", "Statistics", "SQL", "TensorFlow"],
        "top_courses": ["B.Tech CSE", "B.Sc Data Science", "M.Sc Statistics"],
        "certifications": ["IBM Data Science", "Google Data Analytics", "Coursera ML"],
        "avg_salary": "8-30 LPA",
        "top_colleges": [
            "IISc Bangalore", "IIT Bombay", "IIT Madras",
            "ISI Kolkata", "IIT Delhi", "NIT Trichy",
            "BITS Pilani", "Amrita University", "Christ University Bangalore",
            "Manipal Institute", "VIT Vellore", "Symbiosis Pune"
        ],
        "job_outlook": "Extremely high demand across all sectors"
    },
    {
        "title": "Environmental Scientist",
        "tags": ["science", "environment", "research"],
        "streams": ["Science"],
        "required_skills": ["Biology", "Chemistry", "Statistics", "Research", "GIS"],
        "top_courses": ["B.Sc Environmental Science", "M.Sc Environment"],
        "certifications": ["IEMA Membership", "GIS Certification", "GATE ENV"],
        "avg_salary": "3-12 LPA",
        "top_colleges": [
            "JNU Delhi", "BHU Varanasi", "Delhi University",
            "IIT Bombay", "IIT Delhi", "Jadavpur University Kolkata",
            "University of Hyderabad", "Pondicherry University",
            "Amrita University", "Manipal Institute",
            "SRM Chennai", "Symbiosis Pune"
        ],
        "job_outlook": "Growing with increased focus on sustainability and climate"
    },
    {
        "title": "Sports Coach / Analyst",
        "tags": ["sports", "fitness", "coaching", "analytics"],
        "streams": ["Science", "Arts"],
        "required_skills": ["Sports Knowledge", "Communication", "Statistics", "Leadership"],
        "top_courses": ["B.P.Ed", "M.P.Ed", "Sports Science"],
        "certifications": ["NIS Coaching", "SAI Certification", "FIFA/BCCI Coaching"],
        "avg_salary": "3-15 LPA",
        "top_colleges": [
            "LNIPE Gwalior", "Sports Authority of India",
            "Manipal University", "Amity University Noida",
            "Lovely Professional University Punjab", "Chandigarh University",
            "Guru Nanak Dev University Amritsar", "BHU Varanasi",
            "Osmania University Hyderabad", "Annamalai University Tamil Nadu"
        ],
        "job_outlook": "Growing with India's push in sports and Olympics preparation"
    },
    {
        "title": "Entrepreneur / Startup Founder",
        "tags": ["business", "tech", "creative", "management"],
        "streams": ["Science", "Commerce", "Arts"],
        "required_skills": ["Problem Solving", "Communication", "Leadership", "Financial Modeling"],
        "top_courses": ["B.Tech", "BBA", "MBA", "Any degree"],
        "certifications": ["Stanford Entrepreneurship", "IIM Startup Course"],
        "avg_salary": "Variable — 0 to unlimited",
        "top_colleges": [
            "IIT Bombay (E-Cell)", "IIT Delhi (E-Cell)", "IIM Ahmedabad",
            "BITS Pilani", "IIM Bangalore", "ISB Hyderabad",
            "NIT Trichy", "XLRI Jamshedpur", "SP Jain Mumbai",
            "Christ University Bangalore", "Amity University Noida",
            "Any college with a strong startup culture"
        ],
        "job_outlook": "India's startup ecosystem is the 3rd largest in the world"
    },
    {
        "title": "Civil Services (IAS/IPS)",
        "tags": ["government", "law", "arts", "management"],
        "streams": ["Arts", "Science", "Commerce"],
        "required_skills": ["Writing", "Communication", "Current Affairs", "Critical Thinking"],
        "top_courses": ["Any graduation", "BA Political Science", "BA History"],
        "certifications": ["UPSC CSE", "State PSC"],
        "avg_salary": "7-18 LPA + benefits",
        "top_colleges": [
            "Delhi University", "JNU Delhi", "BHU Varanasi",
            "Jamia Millia Islamia Delhi", "Allahabad University",
            "Loyola College Chennai", "St. Stephen's College Delhi",
            "Hindu College Delhi", "Fergusson College Pune",
            "Presidency University Kolkata", "Osmania University Hyderabad",
            "Any college — UPSC is open to all graduates"
        ],
        "job_outlook": "Prestigious career with job security and social impact"
    }
]

async def seed():
    await careers_collection.delete_many({})
    await careers_collection.insert_many(careers)
    print(f"✅ Successfully seeded {len(careers)} careers!")

asyncio.run(seed())