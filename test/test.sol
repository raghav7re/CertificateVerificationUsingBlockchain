// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CertificateVerification.sol";

contract TestCertificateVerification {

    CertificateVerification private certVerif = CertificateVerification(DeployedAddresses.CertificateVerification());

    bytes32 constant private orgId = "ORG_ID";
    bytes32 constant private stuId = "STU_ID";
    bytes32 constant private documentHash = "DOCUMENT_HASH";
    bytes32[] private emptyArray;

    function testAddOrganization() public {
        string memory expectedMessage = "Organization added successfully";

        string memory result = certVerif.addOrganization(address(this), orgId, "test org name");

        Assert.equal(result, expectedMessage, "Organization was not added successfully");
        Assert.equal(certVerif.getName(orgId), "test org name", "Organization name is not correct");
    }

    function testAddStudent() public {
        string memory expectedMessage = "Student added successfully";

        string memory result = certVerif.addStudent(address(this), stuId, "test student name");

        Assert.equal(result, expectedMessage, "Student was not added successfully");
        (string memory name, address studentAddress, uint no) = certVerif.getStudentDetails(stuId);
        Assert.equal(name, "test student name", "Student name is not correct");
        Assert.equal(studentAddress, address(this), "Student address is not correct");
        Assert.equal(no, 0, "Student number of certificates is not correct");
    }

    function testAddCertificate() public {
    string memory expectedMessage = "Document is added in blockchain";

    bytes memory result = certVerif.addCertificate(documentHash, orgId, stuId);

    bytes memory expectedBytes = bytes(expectedMessage);
    Assert.equal(result.length, expectedBytes.length, "Certificate was not added successfully");
    for (uint i = 0; i < expectedBytes.length; i++) {
        Assert.equal(result[i], expectedBytes[i], "Certificate was not added successfully");
    }

    (string memory certfHashes, bytes32[] memory orgIds, uint no) = certVerif.getStudentDetails(stuId);
    Assert.equal(certfHashes[0], documentHash, "Certificate hash is not correct");
    Assert.equal(orgIds[0], orgId, "Organization Id is not correct");
    Assert.equal(no, 1, "Number of certificates is not correct");
}

    function testVerifyCertificate() public {
        (bytes32 verifiedOrgId, bool isVerified) = certVerif.verifyCertificate(documentHash);

        Assert.equal(verifiedOrgId, orgId, "Verified organization Id is not correct");
        Assert.isTrue(isVerified, "Certificate is not verified");
    }

    function testRevokeCertificate() public {
        string memory expectedMessage = "Certificate revoked successfully";

        string memory result = certVerif.revokeCertificate(documentHash);

        Assert.equal(result, expectedMessage, "Certificate was not revoked successfully");
        (bytes32[] memory certfHashes, bytes32[] memory orgIds, uint no) = certVerif.getStudentDetails(bytes32(stuId));
        Assert.equal(certfHashes, emptyArray, "Certificate was not revoked from student");
        Assert.equal(no, 0, "Number of certificates is not correct after revocation");
    }

}
