#include <iostream>
#include <unordered_map>
#include <utility>
using namespace std;

char arr[3][3];
unordered_map<char,pair<int,int> > m;

void display(){
    cout<<"-------------"<<endl;
    cout<<"|"<< " "<<arr[0][0]<<" "<<"|"<< " "<<arr[0][1]<<" "<<"|"<< " "<<arr[0][2]<<" "<<"|"<<endl;
    cout<<"|---|---|---|"<<endl;
    cout<<"|"<< " "<<arr[1][0]<<" "<<"|"<< " "<<arr[1][1]<<" "<<"|"<< " "<<arr[1][2]<<" "<<"|"<<endl;
    cout<<"|---|---|---|"<<endl;
    cout<<"|"<< " "<<arr[2][0]<<" "<<"|"<< " "<<arr[2][1]<<" "<<"|"<< " "<<arr[2][2]<<" "<<"|"<<endl;
    cout<<"-------------"<<endl;
}
void gameover(int y){
    bool b=false;
    for(int i=0;i<3;i++){
        if(arr[i][0]==arr[i][1] && arr[i][1]==arr[i][2]){
            b=true;
        }
    }
    for(int i=0;i<3;i++){
        if(arr[0][i]==arr[1][i] && arr[1][i]==arr[2][i]){
           b=true;
        }
    }
    if(arr[0][0]==arr[1][1] && arr[1][1]==arr[2][2]){
        b=true;
    }
    else if(arr[0][2]==arr[1][1] && arr[1][1]==arr[2][0]){
        b=true;
    }

    if(b==true){
        if(y%2==0){
            cout<<"Gameover : Player 1 Wins!!";
        }
        else{
            cout<<"Gameover : Player 2 Wins!!";
        }
        exit(0);
    }
}
void turn(int i){
    char p;
    for(;;){
        cin>>p;
        int i1=m[p].first;
        int i2=m[p].second;
        if(arr[i1][i2]=='x' || arr[i1][i2]=='o'){
            cout<<"Try another position";
            continue;
        }
        else if(arr[i1][i2]!='x' && arr[i1][i2]!='o'){
            if(i%2==0){
                arr[i1][i2]='x';
            }
            else{
                arr[i1][i2]='o';
            }
            break;
        }
    }
}
int main()
{ 
    m['1'] = make_pair(0,0);
    m['2'] = make_pair(0,1);
    m['3'] = make_pair(0,2);
    m['4'] = make_pair(1,0);
    m['5'] = make_pair(1,1);
    m['6'] = make_pair(1,2);
    m['7'] = make_pair(2,0);
    m['8'] = make_pair(2,1);
    m['9'] = make_pair(2,2);

    arr[0][0]='1'; arr[0][1]='2'; arr[0][2]='3'; 
    arr[1][0]='4'; arr[1][1]='5'; arr[1][2]='6'; 
    arr[2][0]='7'; arr[2][1]='8'; arr[2][2]='9';

    display();
    for(int i=0;i<9;i++){
        cout<<"select any position : ";
        turn(i);
        display();
        gameover(i);
    }
     
}