# Net worth

Networth is a cash flow management system which helps to keep a track of daily expenses and gives a graphical report of the expenses according to each month and also year.

The project is constructed into two Django Apps

*  webserver
*  api

webserver emulates a file server. Usually this would be a separate project in itself. api is a REST-API that handles application logic and serves JSON at all endpoints.


## Getting Started with the Project

To get started with the project:

        $ https://gitlab.com/vivekchandrabs/net-worth.git

To install all dependencies, create a new virutalenv with your preferred plugin and do
    
        $ pip install -r requirements.txt

Create branches for efficient development:

    Follow the step below properly for onboarding:

        $ git checkout -b develop
        $ git pull origin develop
        
        $ git checkout -b webserver
        $ git pull origin develop

Perform migrations:
        
        $ python manage.py makemigrations
        $ python manage.py migrate

To run the project, Go to the root folder and run

        $ python manage.py runserver
        
## Usage:
    
There are 3 api end points:

1.      $ http://127.0.0.1/api/category/
    
    This api is used to add or delete category.
    
    Output of the above api looks as follows:

    [
    {
        "id": 1,
        "title": "Rent",
        "description": "class room"
    },
    {
        "id": 2,
        "title": "Wages",
        "description": "people"
    },
    {
        "id": 3,
        "title": "food",
        "description": "woow"
    },
    {
        "id": 4,
        "title": "game",
        "description": "blast"
    }
    ]
        
2. $ http://127.0.0.1/api/expenses/

    This api is used to add, delete the expense
    
    Output of the above api looks as follows:
    
    [
    {
        "id": 1,
        "title": "april",
        "description": "paid 5000",
        "cost": 5000,
        "timestamp": "2019-04-13T10:36:47.010528Z",
        "categories": {
            "id": 1,
            "title": "Rent",
            "description": "class room"
        }
    },
    {
        "id": 2,
        "title": "march",
        "description": "paid 5000",
        "cost": 5000,
        "timestamp": "2019-04-13T10:42:13.915371Z",
        "categories": {
            "id": 1,
            "title": "Rent",
            "description": "class room"
        }
    },
    {
        "id": 3,
        "title": "wages",
        "description": "paid 3000",
        "cost": 3000,
        "timestamp": "2019-04-13T10:42:40.837439Z",
        "categories": {
            "id": 2,
            "title": "Wages",
            "description": "people"
        }
    }
    ]
    
3. $ http://127.0.0.1/api/month/

    This api is used to get the expenses of the particular month
    
    Number of the month should be sent to the backend in the json format as follows:
    
    {
        "month":4
    }
    
    
    **4 is for april month in the same way 3 is for march month.**
    
