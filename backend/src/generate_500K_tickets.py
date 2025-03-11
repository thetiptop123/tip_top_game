import random
import string
import json

def generate_codes(num_codes):
    """
    Génère un ensemble de num_codes codes alphanumériques (chiffres + lettres) 
    de 10 caractères. On choisit de préfixer par "THE" (3 caractères) + 7 caractères random
    pour un total de 10, mais c'est modulable selon les besoins.
    """

    codes_set = set()
    chars = string.ascii_uppercase + string.digits  # Lettres majuscules + chiffres

    while len(codes_set) < num_codes:
        random_part = ''.join(random.choice(chars) for _ in range(7))  # 7 caractères aléatoires
        new_code = "THE" + random_part
        codes_set.add(new_code)

    return list(codes_set)


def main():
    # Définition de la répartition (lots)
    lots = [
        ("Lot 1", "1 Infuseur à thé", 300_000),  # 60% de 500000
        ("Lot 2", "1 Boite de 100g d’un thé détox ou infusion", 100_000),  # 20%
        ("Lot 3", "1 boite de 100g d’un thé signature", 50_000),  # 10%
        ("Lot 4", "1 coffret découverte d’une valeur de 39€", 30_000),  # 6%
        ("Lot 5", "1 coffret découverte d’une valeur de 69€", 20_000)  # 4%
    ]

    total_tickets = sum(lot[2] for lot in lots)
    print(f"Nombre total de tickets à générer : {total_tickets}")

    # Générer tous les codes uniques
    all_codes = generate_codes(total_tickets)

    # On mélange pour éviter que tous les codes d'un lot se suivent
    random.shuffle(all_codes)

    # On va stocker tous les tickets dans une liste de dictionnaires
    tickets_data = []
    current_index = 0
    ticket_id = 1

    # Pour chaque lot, on récupère la quantité voulue
    for (lot_name, lot_label, lot_quantity) in lots:
        for _ in range(lot_quantity):
            code = all_codes[current_index]
            current_index += 1
            
            # Construction d'un dictionnaire pour un ticket
            ticket_dict = {
                "ID": str(ticket_id),
                "Code": code,
                "Lot": lot_name,
                "Libelle": lot_label
            }
            tickets_data.append(ticket_dict)
            ticket_id += 1

    # tickets_data contient 500.000 dictionnaires

    # On construit l'objet final {"data": [...500000 objets...]} 
    output_json = { "data": tickets_data }

    # Écriture dans le fichier data.json
    with open("tickets.json", "w", encoding="utf-8") as f:
        # Indentation pour rendre le JSON plus lisible, et ensure_ascii=False pour garder les accents
        json.dump(output_json, f, indent=2, ensure_ascii=False)

    print("Fichier data.json généré avec succès !")


if __name__ == "__main__":
    main()
