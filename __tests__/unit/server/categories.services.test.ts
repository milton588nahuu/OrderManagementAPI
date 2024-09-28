import { categCreator, categDelete, categShow, categUpdate } from '../../../src/services/categories.service';
import { categories } from '../../../src/models/models.Northwin';

jest.mock('../../../src/models/models.Northwin');

describe.skip('categories', () => {
  
  it('should insert a doc into collection', async () => {
    const mockCategory = {
      categoryID: 2, category: 'Beverages', description: 'Soft drinks, coffees, teas, beers, and ales'
    }
    categories.create = jest.fn().mockResolvedValue(mockCategory);
    const result = await categCreator(mockCategory);
    expect(result).toEqual(mockCategory); 
    expect(categories.create).toHaveBeenCalledWith(mockCategory);
  });

  it('should handle errors from categories create', async () => {
    const mockCategory = { 
      categoryID: 2, 
      category: 'Beverages', 
      description: 'Sweet and savory'
    };

    categories.create = jest.fn().mockRejectedValue(new Error("Error"));
    await expect(categCreator(mockCategory)).rejects.toThrow('Error');
  });

  it('should show all documents', async () => {
    const moskCategory = [{ categoryID: 2, category: 'Beverages', description: 'Soft drinks, coffees, teas, beers, and ales' }];
    categories.find = jest.fn().mockReturnValue(moskCategory);
    const result = await categShow();
    expect(categories.find()).toEqual(result);
  });

  it('should return null', async () => {
    const mockCategory = [{}];
    categories.find = jest.fn().mockReturnValue(mockCategory);
    const result = await categShow();
    expect(categories.find()).toEqual(result);
  });

  it('It should return the updated', async () => {
    const _id = '66b99eba6e91031827f6e3c0';
    const mockCategory = {
      categoryID:5,
      category:"Grains/Cereals",
      description:"Breads,crackers, pasta, and cereal"
    };
    categories.findByIdAndUpdate = jest.fn().mockReturnValue({_id,...mockCategory});
    const result = await categUpdate(_id,mockCategory);
    expect(categories.findByIdAndUpdate()).toEqual(result);
  });

  it('Should return an error when updating', async () => {  
    const _id = '66b99eba6e91031827f6';
    const mockCategory = {
      categoryID:5,
      category:"Grains/Cereals",
      description:"Breads,crackers, pasta, and cereal"
    };
    categories.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error("error"));
    await expect(categUpdate(_id,mockCategory)).rejects.toThrow("error");
  });


  it('Should return the category deleted', async () => {  
    const _id = '66b99eba6e91031827f6';
    const mockCategory ={
      _id,
      categoryID:5,
      category:"Grains/Cereals",
      description:"Breads,crackers, pasta, and cereal"
    }
    categories.findByIdAndDelete = jest.fn().mockReturnValue(mockCategory);
    const result = await categDelete(_id);
    expect(categories.findByIdAndDelete()).toEqual(result);
  });

  it('must reject the promise to eliminate', async () => {  
    const _id = '66b99eba6e91031827f6';
    categories.findByIdAndDelete = jest.fn().mockRejectedValueOnce(new Error("error when deleting"));
    await expect(categDelete(_id)).rejects.toThrow("error when deleting");

  });
 

});

