//
//  main.cpp
//  chatbackend
//
//  Created by Om Lanke on 19/10/24.
//

#include "crow_all.h"
#include <string>
#include <vector>
#include <ctime>
#include <iostream>

static int idCounter = 0;

class Space;

class User{
    private:
        int id;
        std::string name;
        std::string email;
        std::string photo_url;
        std::vector<Space*> spaces;
    public:
        User(std::string name, std::string email, std::string photo_url){
            this->id = idCounter++;
            this->name = name;
            this->email = email;
            this->photo_url = photo_url;
            this->spaces = std::vector<Space*>();
        }

        int getId(){
            return this->id;
        }

        std::string getName(){
            return this->name;
        }

        std::string getEmail(){
            return this->email;
        }

        std::string getPhotoUrl(){
            return this->photo_url;
        }

        std::vector<Space*> getSpaces(){
            return this->spaces;
        }

        crow::json::wvalue to_json() const {
                    crow::json::wvalue user_json;
                    user_json["id"] = this->id;
                    user_json["name"] = this->name;
                    user_json["email"] = this->email;
                    user_json["photo_url"] = this->photo_url;
                    return user_json;
                }
};

class Message{
    private:
        int id;
        std::string content;
        User* sender;
        std::time_t sentTime;
    public:
        Message(std::string content, User* sender, std::time_t sentTime){
            this->id = idCounter++;
            this->content = content;
            this->sender = sender;
            this->sentTime = sentTime;
        }

        int getId(){
            return this->id;
        }

        std::string getContent(){
            return this->content;
        }

        User* getSender(){
            return this->sender;
        }

        // Time in seconds since epoch
        auto getSentTime(){
            return this->sentTime;
        }

        // Time in Thu Oct 17 13:45:00 2024 Format!
        auto getSentTimeFormatted() const {
            return std::asctime(std::localtime(&this->sentTime));
        }

        crow::json::wvalue to_json() const {
                    crow::json::wvalue message_json;
                    message_json["id"] = this->id;
                    message_json["content"] = this->content;
                    message_json["sender"] = this->sender->to_json();
                    message_json["sentTime"] = this->getSentTimeFormatted();
                    return message_json;
                }
};

class Space{
    private:
        int id;
        std::string name;
        std::string photo_url;
        std::vector<User*> members;
        std::vector<Message*> messages;
    public:
        Space(std::string name, std::string photo_url){
            this->id = idCounter++;
            this->name = name;
            this->photo_url = photo_url;
        }

        int getId(){
            return this->id;
        }

        std::string getName(){
            return this->name;
        }

        std::string getPhotoUrl(){
            return this->photo_url;
        }

        std::vector<User*> getMembers(){
            return this->members;
        }

        std::vector<Message*> getMessages(){
            return this->messages;
        }

        void addMember(User* user){
            this->members.push_back(user);
        }

        void removeMember(User* user){
            for(int i = 0; i < this->members.size(); i++){
                if(this->members[i]->getId() == user->getId()){
                    this->members.erase(this->members.begin() + i);
                    break;
                }
            }
        }

        void addMessage(Message* message){
            this->messages.push_back(message);
        }

        void removeMessage(Message* message){
            for(int i = 0; i < this->messages.size(); i++){
                if(this->messages[i]->getId() == message->getId()){
                    this->messages.erase(this->messages.begin() + i);
                    break;
                }
            }
        }

        crow::json::wvalue to_json() const {
                    crow::json::wvalue space_json;
                    space_json["id"] = this->id;
                    space_json["name"] = this->name;
                    space_json["photo_url"] = this->photo_url;
                    space_json["members"] = crow::json::wvalue::list();
                    for (size_t i = 0; i < this->members.size(); i++) {
                        space_json["members"][i] = this->members[i]->to_json();
                    }
                    space_json["messages"] = crow::json::wvalue::list();
                    for (size_t i = 0; i < this->messages.size(); i++) {
                        space_json["messages"][i] = this->messages[i]->to_json();
                    }
                    return space_json;
                }
};

class Gupshup : public Space{
    private:

    public:
        Gupshup(std::string photo_url) : Space("Gupshup", photo_url){

        }
};

std::vector<User*> allUsers;
std::vector<Space*> allSpaces;

int main()
{

    crow::SimpleApp app; //define your crow application

    //define your endpoint at the root directory
    CROW_ROUTE(app, "/")([](){
        return "Hello world";
    });

    CROW_ROUTE(app, "/").methods(crow::HTTPMethod::POST)
        ([](const crow::request& req){
            // Extract the body of the POST request
            // std::string body = req.body;
            auto x = crow::json::load(req.body);
            if (!x)
                return crow::response(crow::status::BAD_REQUEST);
            crow::json::wvalue y(x);
            return crow::response(y);
        });

    CROW_ROUTE(app, "/users")
        ([]() {
            // Capture allUsers by reference
            crow::json::wvalue all_users_json = crow::json::wvalue::list();

            // Iterate over all users and add them to the JSON array
            for (size_t i = 0; i < allUsers.size(); i++) {
                all_users_json[i] = allUsers[i]->to_json();
            }

            // Return the JSON response
            return crow::response(all_users_json);
        });

    CROW_ROUTE(app, "/users").methods(crow::HTTPMethod::POST)
        ([](const crow::request& req){
            // Extract the body of the POST request
            // std::string body = req.body;
            auto x = crow::json::load(req.body);
            if (!x)
                return crow::response(crow::status::BAD_REQUEST);

            std::string name = x["name"].s();
            std::string email = x["email"].s();
            std::string photo_url = x["photo_url"].s();
            User* user = new User(name, email, photo_url);
            // std::cout << "User Created with ID: " << user->getId() << std::endl;
            // std::cout << "User Name: " << user->getName() << std::endl;
            // std::cout << "User Email: " << user->getEmail() << std::endl;
            // std::cout << "User Photo URL: " << user->getPhotoUrl() << std::endl;
            allUsers.push_back(user);
            crow::json::wvalue y(user->to_json());
            return crow::response(y);
        });


    CROW_ROUTE(app, "/spaces")
        ([]() {
            // Capture allUsers by reference
            crow::json::wvalue all_spaces_json = crow::json::wvalue::list();

            // Iterate over all users and add them to the JSON array
            for (size_t i = 0; i < allSpaces.size(); i++) {
                all_spaces_json[i] = allSpaces[i]->to_json();
            }

            // Return the JSON response
            return crow::response(all_spaces_json);
        });

    CROW_ROUTE(app, "/spaces").methods(crow::HTTPMethod::POST)
        ([](const crow::request& req){
            // std::string body = req.body;
            auto x = crow::json::load(req.body);
            if (!x)
                return crow::response(crow::status::BAD_REQUEST);

            std::string name = x["name"].s();
            std::string photo_url = x["photo_url"].s();
            Space* space = new Space(name, photo_url);


            allSpaces.push_back(space);
            crow::json::wvalue y(space->to_json());
            return crow::response(y);
        });



    //set the port, set the app to run on multiple threads, and run the app
    app.port(18080).multithreaded().run();
}
