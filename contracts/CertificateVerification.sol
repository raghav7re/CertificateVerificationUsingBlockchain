pragma solidity ^0.8.0;

contract CertificateVerification {
    
    struct Organization {
        string name;
        address orgAddress;
        bool exists;
    }
    
    struct Student {
        string name;
        address studentAddress;
        bytes32[] certfHashes;
        bytes32[] orgIds;
        uint no;
    }
    
    struct Certificate {
        bytes32 orgId;
        bool verified;
        uint date;
    }
    
    modifier ownerOnly {
        require(msg.sender == owner, "Authorization Error");
        _;
    }
    
    event CertificateAdded(bytes32 documentHash, bytes32 orgId, bytes32 stuId);
    event CertificateVerified(bytes32 documentHash, bytes32 orgId);
    
    mapping(bytes32 => Certificate) private certificates;
    mapping(bytes32 => Organization) private organizations;
    mapping(bytes32 => Student) private students;
    mapping(bytes32 => string) private names;
    
    address private owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function addCertificate(bytes32 documentHash, bytes32 orgId, bytes32 stuId) public returns (bytes memory) {
        Organization memory orgData = organizations[orgId];
        Certificate memory certData = certificates[documentHash];
        
        require(msg.sender == orgData.orgAddress || msg.sender == students[stuId].studentAddress, "Authorization Error");
        require(documentHash.length == 32, "Hash is invalid");
        require(!certData.verified, "Document already verified");
        
        certificates[documentHash] = Certificate(orgId, true, block.timestamp);
        
        Student storage student = students[stuId];
        student.certfHashes.push(documentHash);
        student.orgIds.push(orgId);
        student.no++;
        
        emit CertificateAdded(documentHash, orgId, stuId);
        return "Document is added in blockchain";
    }
    
    function verifyCertificate(bytes32 documentHash) public view returns (bytes32, bool) {
        require(documentHash.length == 32, "Hash is invalid");
        
        Certificate memory certData = certificates[documentHash];
        if(certData.verified) {
            return (certData.orgId, true);
        } else {
            return ("Document is not valid", false);
        }
    }
    
    function addOrganization(address orgAddress, bytes32 orgId, string memory name) public ownerOnly returns (string memory) {
        require(orgId.length == 32, "Organization Id is invalid");
        
        organizations[orgId] = Organization(name, orgAddress, true);
        return "Organization added successfully";
    }
    
    function addStudent(address stuAddress, bytes32 stuId, string memory name) public returns (string memory) {
        require(stuId.length == 32, "Student Id is invalid");
        
        Student storage student = students[stuId];
        student.name = name;
        student.studentAddress = stuAddress;
        student.no = 0;
        
        return "Student added successfully";
    }
    
    function modifyOrganizationAddress(address orgAddress, bytes32 orgId, string memory name) public ownerOnly returns (string memory) {
        Organization memory orgData = organizations[orgId];
        require(orgData.exists, "Organization is not registered");
        
        organizations[orgId] = Organization(name, orgAddress, true);
        return "Organization address updated successfully";
    }
    
    function getName(bytes32 orgId) public view returns (string memory) {
        Organization memory orgData = organizations[orgId];
        require(orgData.exists, "Organization is not registered");
        
        return orgData.name;
    }
        

function getCertificateHashes(bytes32 stuId) public view returns (bytes32[] memory) {
    Student memory student = students[stuId];
    require(student.studentAddress == msg.sender || msg.sender == owner, "Authorization Error");
    
    return student.certfHashes;
}

function getCertificateDetails(bytes32 certificateHash) public view returns (bytes32, bool, uint) {
    Certificate memory certificate = certificates[certificateHash];
    require(certificate.orgId != "", "Certificate not found");
    require(students[getStudentIdByCertificateHash(certificateHash)].studentAddress == msg.sender || msg.sender == owner, "Authorization Error");
    
    return (certificate.orgId, certificate.verified, certificate.date);
}

function getStudentIdByCertificateHash(bytes32 certificateHash) public view returns (bytes32) {
    Certificate memory certificate = certificates[certificateHash];
    require(certificate.orgId != "", "Certificate not found");
    
    bytes32[] memory certfHashes = students[getStudentIdByCertificateHash(certificateHash)].certfHashes;
    for (uint i = 0; i < certfHashes.length; i++) {
        if (certfHashes[i] == certificateHash) {
            return getStudentIdByCertificateHash(certificateHash);
        }
    }
    revert("Certificate not found");
}

function getStudentDetails(bytes32 stuId) public view returns (string memory, address, uint) {
    Student memory student = students[stuId];
    require(student.studentAddress == msg.sender || msg.sender == owner, "Authorization Error");
    
    return (student.name, student.studentAddress, student.no);
}

function revokeCertificate(bytes32 certificateHash) public ownerOnly returns (string memory) {
    Certificate memory certificate = certificates[certificateHash];
    require(certificate.orgId != "", "Certificate not found");
    require(!certificate.verified, "Verified certificate can't be revoked");
    
    bytes32 stuId = getStudentIdByCertificateHash(certificateHash);
    bytes32[] storage certfHashes = students[stuId].certfHashes;
    for (uint i = 0; i < certfHashes.length; i++) {
        if (certfHashes[i] == certificateHash) {
            certfHashes[i] = certfHashes[certfHashes.length - 1];
            certfHashes.pop();
            delete certificates[certificateHash];
            emit CertificateVerified(certificateHash, certificate.orgId);
            return "Certificate revoked successfully";
        }
    }
    revert("Certificate not found");
}

}