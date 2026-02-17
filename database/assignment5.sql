-- Insert these through Sign-up page of the app for table `account`
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Basic', 'Client', 'basic@340.edu', 'I@mABas1cCl!3nt');

-- Insert these through Sign-up page of the app for table `account`
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Happy', 'Employee', 'happy@340.edu', 'I@mAnEmpl0y33');
-- Insert these through Sign-up page of the app for table `account`
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Manager', 'User', 'manager@340.edu', 'I@mAnAdm!n1strat0r');

-- Update account type to Employee
UPDATE public.account
SET account_type = 'Employee'
WHERE account_firstname = 'Happy';

-- Update account type to Admin
UPDATE public.account
SET account_type = 'Admin'
WHERE account_lastname = 'User';