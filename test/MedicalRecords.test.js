const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalRecords", () => {
  let user1, medical, transactionResponse, transactionReceipt;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    user1 = accounts[1];
    const Medical = await ethers.getContractFactory("MedicalRecords");
    medical = await Medical.connect(user1).deploy();
  });

  describe("Deployment", () => {
    it("The contract is deployed successfully", async () => {
      expect(await medical.address).to.not.equal(0);
    });
  });

  describe("Add Record", () => {
    beforeEach(async () => {
      transactionResponse = await medical.addRecord(
        "Wastron",           // name
        22,                  // age
        "Male",              // gender
        "B positive",        // bloodType
        "Dengue",            // allergies
        "Dengue",            // diagnosis
        "Dengue",            // treatment
        "https://image.url"  // imageURL (new)
      );
      transactionReceipt = await transactionResponse.wait();
    });

    it("Emits a Add Record event", async () => {
      const event = transactionReceipt.events[0];
      expect(event.event).to.equal("MedicalRecords__AddRecord");
      const args = event.args;
      expect(args.timestamp).to.not.equal(0);
      expect(args.name).to.equal("Wastron");
      expect(args.age).to.equal(22);
      expect(args.gender).to.equal("Male");
      expect(args.bloodType).to.equal("B positive");
      expect(args.allergies).to.equal("Dengue");
      expect(args.diagnosis).to.equal("Dengue");
      expect(args.treatment).to.equal("Dengue");
      expect(args.imageURL).to.equal("https://image.url");
    });

    it("The getRecord function is working", async () => {
      const [
        timestamp,
        name,
        age,
        gender,
        bloodType,
        allergies,
        diagnosis,
        treatment,
        imageURL,
      ] = await medical.getRecord(1);
      expect(timestamp).to.not.equal(0);
      expect(name).to.equal("Wastron");
      expect(age).to.equal(22);
      expect(gender).to.equal("Male");
      expect(bloodType).to.equal("B positive");
      expect(allergies).to.equal("Dengue");
      expect(diagnosis).to.equal("Dengue");
      expect(treatment).to.equal("Dengue");
      expect(imageURL).to.equal("https://image.url");
    });
  });

  describe("The delete function is working", () => {
    beforeEach(async () => {
      transactionResponse = await medical.addRecord(
        "Wastron",
        22,
        "Male",
        "B positive",
        "Dengue",
        "Dengue",
        "Dengue",
        "https://image.url"
      );
      transactionReceipt = await transactionResponse.wait();
      transactionResponse = await medical.deleteRecord(1);
      transactionReceipt = await transactionResponse.wait();
    });

    it("The record is deleted", async () => {
      expect(await medical.isDeleted(1)).to.be.equal(true);
    });

    it("Emits a delete event", async () => {
      const event = transactionReceipt.events[0];
      const args = event.args;
      expect(event.event).to.equal("MedicalRecords__DeleteRecord");
      expect(args.timestamp).to.not.equal(0);
      expect(args.name).to.equal("Wastron");
      expect(args.age).to.equal(22);
      expect(args.gender).to.equal("Male");
      expect(args.bloodType).to.equal("B positive");
      expect(args.allergies).to.equal("Dengue");
      expect(args.diagnosis).to.equal("Dengue");
      expect(args.treatment).to.equal("Dengue");
      expect(args.imageURL).to.equal("https://image.url");
    });
  });
});
