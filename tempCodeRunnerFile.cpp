#include<iostream>
#include<set>

using namespace std;

int main(){
    set<int> s1={1,2,3};
    set<int> s2={4,5,3};
    set<int> s3=s1+s2;
    cout<<s3.size();
}