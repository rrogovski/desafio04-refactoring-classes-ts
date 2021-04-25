import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { FoodType } from "../../types";
import { toast } from "react-toastify";

interface FoodsProviderProps {
  children: ReactNode
}

interface FoodsContextData {
  foods: FoodType[];
  addFood: (food : FoodType) => Promise<void>;
  updateFood: (food : FoodType) => Promise<void>;
  deleteFood: (foodId : number) => Promise<void>;
  toggleAvailableFood: (food : FoodType) => Promise<void>;
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<FoodType[]>([]);

  useEffect(() => {
    api.get<FoodType[]>('foods')
    .then(response => {
      setFoods(response.data)
    });
  }, [])

  const addFood = async (food: FoodType) => {
    try {
      const response = await api.post('foods', { ...food, available: true});
      const newFood = response.data;
      setFoods([...foods, newFood]);
    } catch (error) {
      toast.error('Erro ao tentar adicionar!');
    }
  }

  const updateFood = async (food: FoodType) => {
    try {
      const foodsUpdated = foods.map(f => {
        return f.id === food.id ? food : f
      })

      api.put(`foods/${food.id}`, food).then(response => {
        setFoods(foodsUpdated);
        toast.success(`${food.name}, atualizado com sucesso!`)
      })
    } catch (error) {
      toast.error('Erro ao tentar atualizar!');
    }
  }

  const deleteFood = async (foodId: number) => {
    try {
      api.delete(`foods/${foodId}`).then(() => {
        const foodsUpdated = [...foods];
        const foodIndex = foodsUpdated.findIndex(food => food.id === foodId);
        foodsUpdated.splice(foodIndex, 1);
        setFoods(foodsUpdated);
      })
    } catch (error) {
      toast.error('Erro ao tentar remover!');
    }
  }

  const toggleAvailableFood = async (food: FoodType) => {
    food.available = !food.available;
    updateFood(food);
  }

  return (
    <FoodsContext.Provider
      value={{
        foods,
        addFood,
        updateFood,
        deleteFood,
        toggleAvailableFood
      }}
    >
      { children }
    </FoodsContext.Provider>
  )
}

export function useFoods(): FoodsContextData {
  const context = useContext(FoodsContext);

  return context;
}
