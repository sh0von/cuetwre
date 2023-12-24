import json

def save_json_to_file(json_data, file_path):
    with open(file_path, 'w') as file:
        json.dump(json_data, file, indent=2)

def load_json_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON from '{file_path}': {e}")
        return None

def display_levels(levels):
    print("Levels:")
    for i, level in enumerate(levels, start=1):
        print(f"{i}. {level['name']}")

def display_terms(terms):
    print("Terms:")
    for i, term in enumerate(terms, start=1):
        print(f"{i}. {term['name']}")

def display_subjects(subjects):
    print("Subjects:")
    for i, subject in enumerate(subjects, start=1):
        print(f"{i}. {subject['title']}")

def display_books(books):
    print("Books:")
    for i, book in enumerate(books, start=1):
        print(f"{i}. {book['name']} - {book['link']}")

def add_subject(term):
    subject_title = input("Enter new subject title: ")
    new_subject = {
        "title": subject_title,
        "books": []
    }
    term["subjects"].append(new_subject)
    print(f"Subject '{subject_title}' added to '{term['name']}'.")

def add_book(subject):
    book_name = input("Enter new book name: ")
    book_link = input("Enter new book link: ")
    new_book = {
        "name": book_name,
        "link": book_link
    }
    subject["books"].append(new_book)
    print(f"Book '{book_name}' added to '{subject['title']}'.")

# Load initial JSON data from file
json_structure = load_json_from_file('src/data.json')

while True:
    display_levels(json_structure["levels"])
    level_choice = int(input("Choose a level (enter the number): "))

    if 1 <= level_choice <= len(json_structure["levels"]):
        selected_level = json_structure["levels"][level_choice - 1]
        display_terms(selected_level["terms"])
        term_choice = int(input("Choose a term (enter the number): "))

        if 1 <= term_choice <= len(selected_level["terms"]):
            selected_term = selected_level["terms"][term_choice - 1]
            display_subjects(selected_term["subjects"])
            print("0. Add new subject")
            subject_choice = int(input("Choose a subject (enter the number or 0 to add new): "))

            if subject_choice == 0:
                add_subject(selected_term)
            elif 1 <= subject_choice <= len(selected_term["subjects"]):
                selected_subject = selected_term["subjects"][subject_choice - 1]
                display_books(selected_subject["books"])
                print("0. Add new book")
                book_choice = int(input("Choose a book (enter the number or 0 to add new): "))

                if book_choice == 0:
                    add_book(selected_subject)
                elif 1 <= book_choice <= len(selected_subject["books"]):
                    print(f"You selected: {selected_subject['books'][book_choice - 1]['name']} - {selected_subject['books'][book_choice - 1]['link']}")
                else:
                    print("Invalid book choice.")
            else:
                print("Invalid subject choice.")
        else:
            print("Invalid term choice.")
    else:
        print("Invalid level choice.")

    save_json_to_file(json_structure, 'src/data.json')

    continue_program = input("Do you want to continue? (yes/no): ")
    if continue_program.lower() != 'yes':
        break
