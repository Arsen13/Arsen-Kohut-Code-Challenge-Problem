## Problem 6: Architecture

This module is part of the backend application server responsible for updating and maintaining a live scoreboard. The scoreboard displays the top 10 user scores and updates in real-time whenever a user completes an action that increases their score.

### Verbal description of the operation of the software module

1. User completes an action.
2. Action triggers a requset to the `/api/update-score` endpoint with request body
3. Backend server validates the request parameters
4. Server authenticate the `auth_token`
5. Server updates the user's score in the database
6. Server retrieves the top 10 scores from the database
7. Server returns the updated score and top 10 scores to the client

### API

1. Updates the score of a user after they complete an action and returns updated score and top 10 scores to the client
   
   `method:` "POST"\
   `endpoint`: "/update-score"
   
   #### Request body:
   {\
      &emsp;&emsp;"id": "string",\
      &emsp;&emsp;"score_increment": "integer",\
      &emsp;&emsp;"auth_token": "string"\
   }
   
   #### Response:
   {\
      &emsp;&emsp;"success": "boolean",\
      &emsp;&emsp;"message": "string",\
      &emsp;&emsp;"new_score": "integer",\
      &emsp;&emsp;"top_users": [\
          &emsp;&emsp;&emsp;&emsp;{\
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"user_id": "string",\
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"score": "integer",\
          &emsp;&emsp;&emsp;&emsp;},\
          &emsp;&emsp;&emsp;&emsp;...\
      &emsp;&emsp;],\
   }
