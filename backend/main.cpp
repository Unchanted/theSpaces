// clang++ main.cpp -pthread -I/opt/homebrew/Cellar/asio/1.30.2/include -std=c++23 -o main && ./main

#include "crow_all.h"
#include <string>
#include <vector>
#include <iostream>

static int idCounter = 0; // global counter fro all classes

class Space;

class User
{
private:
    int id;
    std::string name;
    std::string email;
    std::string photo_url;
    std::vector<Space *> spaces;

public:
    User(std::string name, std::string email, std::string photo_url)
    {
        this->id = idCounter++;
        this->name = name;
        this->email = email;
        this->photo_url = photo_url;
        this->spaces = std::vector<Space *>();
    }

    int getId()
    {
        return this->id;
    }

    std::string getEmail()
    {
        return this->email;
    }

    std::vector<Space *> getSpaces()
    {
        return this->spaces;
    }

    void addSpace(Space *space)
    {
        this->spaces.push_back(space);
    }

    crow::json::wvalue to_json() const
    {
        crow::json::wvalue user_json;
        user_json["id"] = this->id;
        user_json["name"] = this->name;
        user_json["email"] = this->email;
        user_json["photo_url"] = this->photo_url;
        return user_json;
    }
};

class Message
{
private:
    int id;
    std::string content;
    User *sender;
    Message *previousMessage;

public:
    Message(std::string content, User *sender, Message *previousMessage = nullptr)
    {
        this->id = idCounter++;
        this->content = content;
        this->sender = sender;
        this->previousMessage = previousMessage;
    }

    int getId() const
    {
        return this->id;
    }

    Message *getPreviousMessage() const
    {
        return this->previousMessage;
    }

    void setPreviousMessage(Message *previousMessage)
    {
        this->previousMessage = previousMessage;
    }

    crow::json::wvalue to_json() const
    {
        crow::json::wvalue message_json;
        message_json["id"] = this->id;
        message_json["content"] = this->content;
        message_json["sender"] = this->sender->to_json();
        return message_json;
    }
};

class Space
{
private:
    int id;
    std::string name;
    std::string photo_url;
    std::string description;
    std::vector<User *> members;
    Message *lastMessage;

public:
    Space(std::string name, std::string photo_url, std::string description)
    {
        this->id = idCounter++;
        this->name = name;
        this->photo_url = photo_url;
        this->description = description;
        this->lastMessage = nullptr;
    }

    int getId() const
    {
        return this->id;
    }

    std::vector<User *> getMembers() const
    {
        return this->members;
    }

    std::vector<Message *> getMessages() const
    {
        std::vector<Message *> messages;
        Message *currentMessage = this->lastMessage;
        while (currentMessage != nullptr)
        {
            messages.push_back(currentMessage);
            currentMessage = currentMessage->getPreviousMessage();
        }
        reverse(messages.begin(), messages.end());
        return messages;
    }

    void addMember(User *user)
    {
        for (User *member : this->members)
        {
            if (member->getId() == user->getId())
            {
                return;
            }
        }
        this->members.push_back(user);
    }

    void addMessage(Message *message)
    {
        message->setPreviousMessage(this->lastMessage);
        this->lastMessage = message;
    }

    void deleteMessage(int id)
    {
        Message *currentMessage = this->lastMessage;
        Message *previousMessage = nullptr;
        while (currentMessage != nullptr)
        {
            if (currentMessage->getId() == id)
            {
                if (previousMessage != nullptr)
                {
                    previousMessage->setPreviousMessage(currentMessage->getPreviousMessage());
                }
                else
                {
                    this->lastMessage = currentMessage->getPreviousMessage();
                }
                delete currentMessage; // free memory
                return;
            }
            previousMessage = currentMessage;
            currentMessage = currentMessage->getPreviousMessage();
        }
    }

    crow::json::wvalue to_json() const
    {
        crow::json::wvalue space_json;
        space_json["id"] = this->id;
        space_json["name"] = this->name;
        space_json["photo_url"] = this->photo_url;
        space_json["description"] = this->description;

        space_json["members"] = crow::json::wvalue::list();
        for (int i = 0; i < this->members.size(); i++)
        {
            space_json["members"][i] = this->members[i]->to_json();
        }

        return space_json;
    }
};

std::vector<User *> allUsers;
std::vector<Space *> allSpaces;

Space *getSpaceById(int space_id)
{
    for (Space *space : allSpaces)
    {
        if (space->getId() == space_id)
        {
            return space;
        }
    }
    return nullptr;
}

User *getUserById(int userId)
{
    for (User *user : allUsers)
    {
        if (user->getId() == userId)
        {
            return user;
        }
    }
    return nullptr;
}

User *getUserByEmail(std::string email)
{
    for (User *user : allUsers)
    {
        if (user->getEmail() == email)
        {
            return user;
        }
    }
    return nullptr;
}

int main()
{
    crow::App<crow::CORSHandler> app;

    CROW_ROUTE(app, "/")
    ([]()
     { return "Hello world"; });

    CROW_ROUTE(app, "/users") // get all users
    ([]()
     {
        crow::json::wvalue all_users_json = crow::json::wvalue::list();
        for (int i = 0; i < allUsers.size(); i++)
        {
            all_users_json[i] = allUsers[i]->to_json();
        }
        crow::response res(all_users_json);
        return res; });

        CROW_ROUTE(app, "/users/post") //new user
    ([](const crow::request &req)
     {
        std::string name = req.url_params.get("name");
        std::string email = req.url_params.get("email");
        std::string photo_url = req.url_params.get("photo_url");

        User *existingUser = getUserByEmail(email);
        if (existingUser)
        {
            crow::json::wvalue y(existingUser->to_json());
            return crow::response(y);
        }
        User *user = new User(name, email, photo_url);
        allUsers.push_back(user);
        crow::json::wvalue y(user->to_json());
        return crow::response(y); });

    CROW_ROUTE(app, "/users/<int>/spaces") //all spaces of user
    ([](const crow::request &req, int user_id)
     {
         crow::json::wvalue spaces_json = crow::json::wvalue::list();

         User *user = getUserById(user_id);
         if (!user)
         {
             crow::response res(crow::status::NOT_FOUND);
             return res;
         }
         int index = 0;
         for (Space *space : user->getSpaces())
         {
             spaces_json[index++] = space->to_json();
         }
         crow::response res(spaces_json);
         return res;
     });

    CROW_ROUTE(app, "/spaces") // get all spaces
    ([]()
     {
        crow::json::wvalue all_spaces_json = crow::json::wvalue::list();
        for (int i = 0; i < allSpaces.size(); i++)
        {
            all_spaces_json[i] = allSpaces[i]->to_json();
        }
        return crow::response(all_spaces_json); });

        CROW_ROUTE(app, "/spaces/post") //create new space
    ([](const crow::request &req)
     {
        std::string name = req.url_params.get("name");
        std::string photo_url = req.url_params.get("photo_url");
        std::string description = req.url_params.get("description");


        Space *space = new Space(name, photo_url, description);
        allSpaces.push_back(space);
        crow::json::wvalue y(space->to_json());
        return crow::response(y); });

    CROW_ROUTE(app, "/spaces/<int>") // details of a space
    ([](const crow::request &req, int space_id)
     {
         Space *space = getSpaceById(space_id);
         std::cout << space << std::endl;
         if (!space)
         {
             crow::response res(crow::status::NOT_FOUND);
             return res;
         }

         int index = 0;
         crow::response res(space->to_json());
         return res;
     });

        CROW_ROUTE(app, "/spaces/<int>/join/post") //join space
    ([](const crow::request &req, int space_id)
     {
        std::string userIdString = req.url_params.get("user_id");
        std::cout << userIdString << std::endl;
        int userId = std::stoi(userIdString);
        Space *space = getSpaceById(space_id);
        if (!space)
        {
            return crow::response(crow::status::NOT_FOUND);
        }
        User *user = getUserById(userId);
        if (!user)
        {
            return crow::response(crow::status::BAD_REQUEST);
        }
        space->addMember(user);
        bool isMember = false;
        for (Space *space : user->getSpaces())
        {
            if (space->getId() == space_id)
            {
                isMember = true;
                break;
            }
        }
        if (!isMember)
            user->addSpace(space);
        crow::json::wvalue y(space->to_json());
        return crow::response(y); });

    CROW_ROUTE(app, "/spaces/<int>/messages") // get space messages
    ([](const crow::request &req, int space_id)
     {

         crow::json::wvalue messages_json = crow::json::wvalue::list();

         Space *space = getSpaceById(space_id);
         std::cout << space << std::endl;
         if (!space)
         {
             crow::response res(crow::status::NOT_FOUND);
             return res;
         }

         int index = 0;
         for (Message *message : space->getMessages())
         {
             messages_json[index++] = message->to_json();
         }
         crow::response res(messages_json);
         return res;
     });

        CROW_ROUTE(app, "/spaces/<int>/messages/post") //new message
    ([](const crow::request &req, int space_id)
     {
        std::string content = req.url_params.get("content");
        std::string userIdString = req.url_params.get("user_id");
        int userId = std::stoi(userIdString);
        Space* space = getSpaceById(space_id);
        if (!space)
        {
            return crow::response(crow::status::NOT_FOUND);
        }
        User *sender = getUserById(userId);
        bool isMember = false;
        for (User *member : space->getMembers())
        {
            if (member->getId() == sender->getId())
            {
                isMember = true;
                break;
            }
        }
        if (!sender || !isMember)
        {
            return crow::response(crow::status::BAD_REQUEST);
        }
        Message* message = new Message(content, sender);
        space->addMessage(message);
        crow::json::wvalue response_json;
        response_json["message"] = message->to_json();
        return crow::response(response_json); });

    CROW_ROUTE(app, "/spaces/<int>/messages/delete")
    ([](const crow::request &req, int space_id)
     {
        std::string messageIdString = req.url_params.get("message_id");
        int messageId = std::stoi(messageIdString);
        Space* space = getSpaceById(space_id);
        if (!space)
        {
            return crow::response(crow::status::NOT_FOUND);
        }

        space->deleteMessage(messageId);

        return crow::response(crow::status::OK); });

    app.port(8080).multithreaded().run();
}
