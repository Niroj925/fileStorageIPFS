// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Upload{

    struct Access{
        address user;
        bool access;
    }

    mapping (address => string[]) value;//to store url
    mapping (address =>mapping (address=>bool)) ownership;
    mapping (address =>Access[]) public  accessList;
    mapping (address=>mapping (address=>bool)) previousData;
     
     function add(address _user,string calldata url) external {
         value[_user].push(url);//creating dynamic array to add url of the file 
     }


     function allow(address user) external {
         ownership[msg.sender][user]=true;

         if(previousData[msg.sender][user]==true){
             for(uint i=0;i<accessList[msg.sender].length;i++){
                 if(accessList[msg.sender][i].user==user){
                     accessList[msg.sender][i].access=true;
                 }
             }
         }else{
         accessList[msg.sender].push(Access(user,true));
         previousData[msg.sender][user]=true;
         }
     }

     function disallow(address user) external {
         ownership[msg.sender][user]=false;  
            for(uint i=0;i<accessList[msg.sender].length;i++){
                 if(accessList[msg.sender][i].user==user){
                     accessList[msg.sender][i].access=false;
                 }
             }
     }

     function display(address _user) external  view returns (string[] memory){
         require(_user==msg.sender||ownership[_user][msg.sender],"You don't have access");
         return value[_user];
     }

     function shareAccess() public view returns(Access[] memory){
         return accessList[msg.sender];
     }

     //0x4d8De03592d3a8941e0e5Ad802AD51E9e27F8Bd5
}