#include "crow_all.h"

int idCounter = 0;

class User{
    private:
        int id;
        std::string name;
        std::string email;
        std::string photo_url;
    public:
        User(std::string name, std::string email, std::string photo_url){
            this->id = idCounter++;
            this->name = name;
            this->email = email;
            this->photo_url = photo_url;
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
};

class Message{
    private:
        int id;
        std::string content;
        User* sender;
    public:
        Message(std::string content, User* sender){
            this->id = idCounter++;
            this->content = content;
            this->sender = sender;
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
};

int main()
{
    crow::SimpleApp app; //define your crow application

    //define your endpoint at the root directory
    CROW_ROUTE(app, "/")([](){
        return "Hello world";
    });

    //set the port, set the app to run on multiple threads, and run the app
    app.port(18080).multithreaded().run();
}
