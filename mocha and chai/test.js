const chai = require('chai')
const expect = chai.expect
const validator = require('./index')
describe("validator isNumValid()", () => {
	it("should return true for a number in between 10 and 70", ()=> {
		expect(validator.isNumValid(39)).to.be.true
	})
	it("should return false when the number is less 10", () => {
		expect(validator.isNumValid(9)).to.be.false
	})
	it("should return false when the number is equal to 10", () => {
		expect(validator.isNumValid(10)).to.be.false
	})
	it("should return false when the number is equal to 70", () => {
		expect(validator.isNumValid(70)).to.be.false
	})
	it("should return false when the number is greater than 70", () => {
		expect(validator.isNumValid(71)).to.be.false
	})
})