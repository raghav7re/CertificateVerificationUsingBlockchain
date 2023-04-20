// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract certificateVerification

{

struct organization{
    string name;
    address orgAddress;
    bool exists;
}

struct Document {
    bytes32 orgId;
    bool verified;
}

modifier owneronly{
    require(msg.sender==owner,"Authorizaion Error");
    _;

}

mapping(bytes32=> Document) private Documents;
mapping(bytes32 => organization) private organizations;
mapping(bytes32=>string ) private names;

address private owner;

constructor() public {
    owner =msg.sender;
}

function addCertificate(bytes32 documenthash,bytes32 orgId) public returns (string memory){
organization memory orgData =organizations[orgId];
Document memory docData=Documents[documenthash];
require(msg.sender==orgData.orgAddress,"Authorization Error");
require(documenthash.length==32,"Hash is invalid");
require(!docData.verified,"Document already verified");
Documents[documenthash]=Document(orgId,true);
return "Document is added in blockchain";

}
function verifyCertificates(bytes32 documenthash ) public view returns (bytes32 , bool){
require(documenthash.length==32,"Hash is invalid");
Document memory docData =Documents[documenthash];
if(docData.verified)
{
    return (docData.orgId,true);
}
else
{
    return ("Document is not valid",false);
}
}

function addOrganization(address orgAddress , bytes32 orgId,string name) public owneronly() returns(string memory){
    require(orgId.length==32,"Organization Id is invalid");
    organizations[orgId]=organization(orgAddress,true,name);
    return "Organization Added Sucessfully";

}

function modifyOrganizationAddress(address orgAddress ,bytes32 orgId) public owneronly() returns (string memory)
{
    organization memory orgData=organizations[orgId];
    require(orgData.exists,"Organizations is not registered");
    organizations[orgId]=organization(orgAddress,true);
    return "Organization Address Updated Sucessfully";

}
}
