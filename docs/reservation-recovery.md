# Réservations La Gazelle d'Or - procédures d'exploitation

## Parcours du formulaire

- POST /api/reservations valide nom, coordonnées, dates à Genève et fermeture le dimanche.
- Notifications transactionnelles via Resend depuis reservations@lagazelledor.ch : notification au restaurant (uniquement lagazelledorgeneva@gmail.com), puis accusé de réception séparé à l'adresse fournie par le client si la demande a bien été enregistrée ou transmise au restaurant.
- Lorsque MySQL fonctionne : demande enregistrée avec le statut pending ; notification e-mail envoyée ; réponse 201.
- Lorsque MySQL ne fonctionne pas : demande transmise exclusivement par e-mail ; réponse 202 avec deliveryMode=email_only ; message explicite au client. La demande ne figure alors pas dans le tableau de bord.
- En cas de double échec (MySQL et Resend) : réponse 503 et invitation à téléphoner au restaurant, sans fausse confirmation.
- Le client reçoit un récapitulatif (date, service, nombre de personnes) et la mention explicite « demande reçue, table non encore confirmée ». L'accusé de réception client est facultatif pour la survie du formulaire, et son résultat est exposé par customerEmailSent ; la page affiche un message en cas d'échec.
- L'acceptation d'un e-mail ne confirme jamais la table. Seul le restaurant peut confirmer.

## Variables Vercel Production

- RESEND_API_KEY : clé limitée à l'envoi sur le domaine vérifié lagazelledor.ch. À stocker chiffrée.
- RESERVATION_NOTIFY_EMAILS : lagazelledorgeneva@gmail.com. Le destinataire est également limité dans le code.
- ADMIN_JWT_SECRET : secret aléatoire d'au moins 32 caractères, à stocker chiffré.
- DATABASE_URL : mysql://NEW_USER:URL_ENCODED_NEW_PASSWORD@REACHABLE_HOST:3306/DATABASE_NAME, à fournir pour rétablir la persistance et l'administration.
- DATABASE_SSL=true lorsque la base distante prend en charge TLS.
- Les anciennes variables SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM sont obsolètes pour ce formulaire.

## Sécurité

Les anciens identifiants MySQL et SMTP figuraient dans le dépôt GitHub public et son historique. Ils doivent être impérativement révoqués et renouvelés chez le fournisseur. Leur suppression du code actuel ne retire pas les anciennes versions de l'historique Git.

## Tests et lancement

1. Valider les DNS du domaine Resend (DKIM, SPF).
2. Tester une requête invalide : HTTP 400.
3. Tester sans MySQL : GET retourne status=degraded. POST valide retourne HTTP 202 et deliveryMode=email_only si Resend accepte.
4. Tester les envois avec un client de test : deux messages distincts (restaurant et client), destinataires et contenus corrects, avec suivi delivered dans Resend. Vérifier aussi les échecs de Resend, sans envoyer à un véritable client.
5. Avec une base de test isolée, valider une réservation pending en base, notification et affichage administrateur.
6. Vérifier la compilation Next.js, les contrôles TypeScript, les tests et le lint avant déploiement.
7. Après fusion, contrôler le chemin public lagazelledor.ch et le domaine d'expédition.

## Réparation de la base

Faire tourner les identifiants MySQL exposés puis configurer un hôte joignable depuis les fonctions Vercel, les règles d'accès distant et, si possible, TLS. Le formulaire reste opérationnel en mode e-mail tant que la base est indisponible.
