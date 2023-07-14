CREATE TABLE users (
	userID serial PRIMARY KEY,
	Name VARCHAR ( 50 )  NOT NULL,
	password VARCHAR ( 150 ) NOT NULL,
	Email VARCHAR ( 255 ) UNIQUE NOT NULL,
	isActive BOOLEAN DEFAULT true,
	isVerify BOOLEAN DEFAULT true,
	createdAt TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DROP PROCEDURE usp_create_user;
create or replace procedure USP_CREATE_USER(
   Name VARCHAR ( 50 ),
   password VARCHAR ( 150 ), 
   currentEmail VARCHAR ( 255 )
)
language plpgsql    
as $$
begin
   IF EXISTS (SELECT 1  FROM users u where u.Email = currentEmail ) THEN
    RAISE EXCEPTION 'Email Already Exist';
   ELSE
     insert into users (Name,password,Email) values(Name,password,currentEmail);
   END IF;
 
end;$$

call USP_CREATE_USER('Ashok','Test','test23');

	create Table lookup (
		id serial PRIMARY KEY,
		title  VARCHAR ( 50 )  NOT NULL,
		full_name VARCHAR ( 50 )  NOT NULL,
		isActive BOOLEAN DEFAULT true,
		parent_id int ,
		createdAt TIMESTAMP  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		createdBy INT
	);
	insert into lookup  (title,full_name,parent_id,createdBy)
	values ('types','types',1,1);
	
	insert into lookup  (title,full_name,parent_id,createdBy)
	values ('Test Pre Req','Test Pre Req',1,1);
	
	insert into lookup  (title,full_name,parent_id,createdBy)
	values ('Test Steps','Test Steps',1,1);
	
	insert into lookup  (title,full_name,parent_id,createdBy)
	values ('Test Closure','Test Closure',1,1);
	
	
	DROP function get_lookup
	create or replace function get_lookup (
  selected_id INT
) 
	returns table (
		id INT,
		title  VARCHAR ( 50 ),
		full_name VARCHAR ( 50 ),
		isActive BOOLEAN,
		parent_id int ,
		createdAt TIMESTAMP WITH TIME ZONE,
		createdBy INT
	) 
	language plpgsql
as $$
begin
	return query 
		select
			l.*
		from
			lookup l
		where
			l.parent_id = selected_id and l.isActive = true;
end;$$

-- start of create script for actions_config table.

/*CREATE TABLE IF NOT EXISTS public.actions_config
(
    page_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    aut character varying(50) COLLATE pg_catalog."default" NOT NULL,
    action_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    sub_action_name character varying(50) COLLATE pg_catalog."default",
    action_parameters character varying COLLATE pg_catalog."default",
    sub_action_parameters character varying COLLATE pg_catalog."default",
    no_of_fields integer,
    sub_action_no_of_fields integer,
    created_by integer,
    id integer NOT NULL DEFAULT nextval('actions_config_id_seq'::regclass),
    CONSTRAINT action_config_pkey PRIMARY KEY (id)
); */

-- end of create script for actions_config table.

create table actions_config  (
	action_id serial PRIMARY KEY,
	page_name  VARCHAR ( 50 )  NOT NULL,
	aut VARCHAR ( 50 )  NOT NULL,
	action_name VARCHAR ( 50 ),
	sub_action_name VARCHAR ( 50 ),
	action_parameters JSON,
	sub_action_parameters JSON,
	noOfFields INT,
	subActionNoOfFields INT,
	isActive BOOLEAN DEFAULT true,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	createdBy INT,
	updatedAt TIMESTAMP,
	updateBy INT 
	)