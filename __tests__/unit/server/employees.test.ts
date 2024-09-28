import { Employees } from '../../../src/interfaces/Northwin';
import { employees } from '../../../src/models/models.Northwin';
import { empCreator, empDelete, empShow, empUpdate } from '../../../src/services/employees.service'
import { empFilter } from '../../../src/services/filters.service';
jest.mock('../../../src/models/models.Northwin');

describe.skip('employees', () => {

  it('should insert a doc into collection', async () => {
    const mockEmployees:Employees = {
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }
    employees.create = jest.fn().mockResolvedValue(mockEmployees);
    const result = await empCreator(mockEmployees);
    expect(result).toEqual(mockEmployees);
    expect(employees.create).toHaveBeenCalledWith(mockEmployees);
  });

  it('should handle errors from employees create', async () => {
    const mockEmployees:Employees = {
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }

    employees.create = jest.fn().mockRejectedValue(mockEmployees);
    await expect(empCreator(mockEmployees)).rejects.toThrow('Error');
  });

  it('should show all documents', async () => {
    const mockEmployees:Employees = {
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }
    employees.find = jest.fn().mockReturnValue(mockEmployees);
    const result = await empShow();
    expect(employees.find()).toEqual(result);
  });

  it('should return null', async () => {
    const moskemployees = [{}];
    employees.find = jest.fn().mockReturnValue(moskemployees);
    const result = await empShow();
    expect(employees.find()).toEqual(result);
  });

  it('It should return the updated', async () => {
    const _id = '66b99eba6e91031827f6e3c0';
    const mockEmployees:Employees = {
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }
    employees.findByIdAndUpdate = jest.fn().mockReturnValue({ _id, ...mockEmployees });
    const result = await empUpdate(_id, mockEmployees);
    expect(employees.findByIdAndUpdate()).toEqual(result);
  });

  it('Should return an error when updating', async () => {
    const _id = '66b99eba6e91031827f6';
    const mockEmployees:Employees = {
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }
    employees.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(_id);
    await expect(empUpdate(_id, mockEmployees)).rejects.toThrow("error updating");
  });


  it('Should return the employee deleted', async () => {
    const _id = '66b99eba6e91031827f6';
    const mockEmployees = {
      _id,
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }
    employees.findByIdAndDelete = jest.fn().mockReturnValue(mockEmployees);
    const result = await empDelete(_id);
    expect(employees.findByIdAndDelete()).toEqual(result);
  });

  it('must reject the promise to eliminate', async () => {
    const _id = '66b99eba6e91031827f6';
    employees.findByIdAndDelete = jest.fn().mockRejectedValue(_id);
    await expect(empDelete(_id)).rejects.toThrow("error when deleting");
  });


  it('a single empier must return', async () => {
    
    const mockEmployees:Employees = {
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }

    employees.find = jest.fn().mockReturnValue(mockEmployees);
    const results = await empFilter(mockEmployees);
    expect(employees.find()).toEqual(results);
  })

  it('filtering error', async () => {

    const mockEmployees:Employees = {
      employeeID: 1,
      firstName: "Nancy",
      lastName: "Davolio",
      birthdate: "1968-12-08",
      photo: "EmpID1.pic",
      notes: "Education includes a BA in psychology from Colorado State University. She also completed (The Art of the Cold Call). Nancy is a member of 'Toastmasters International'."
    }

    employees.find = jest.fn().mockRejectedValue(mockEmployees);
    expect(empFilter(mockEmployees)).rejects.toThrow("impossible to filter");
  })


});






