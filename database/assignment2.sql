-- Prompt 1: Data for  `account`
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Prompt 2: Modify Tony in `account`
UPDATE  public.account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Prompt 3: Delete `Tony`
DELETE FROM public.account
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Prompt 4: Modify the `GM Hummer` record
UPDATE public.inventory
SET inv_description = REPLACE (inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Prompt 5: Use an inner join to select the `make` and `model` and `classification name`
SELECT inventory.inv_make, inventory.inv_model, classification.classification_name
FROM public.inventory
INNER JOIN public.classification
ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

-- Prompt 6: Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image and inv_thumbnail
UPDATE public.inventory
SET inv_image = REPLACE (inv_image, '/images', '/images/vehicles/'),
    inv_thumbnail = REPLACE (inv_thumbnail, '/images', '/images/vehicles/');
