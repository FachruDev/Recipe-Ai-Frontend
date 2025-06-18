import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';

export interface Ingredient {
  item: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prep_time: string;
  servings: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  selected?: boolean;
}

export function RecipeCard({ recipe, onSelect, selected = false }: RecipeCardProps) {
  return (
    <Card className={`h-full flex flex-col transition-all ${selected ? 'ring-2 ring-teal-500' : ''}`}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{recipe.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{recipe.prep_time} • {recipe.servings}</p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-700 dark:text-gray-300 mb-4">{recipe.description}</p>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Ingredients:</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {ingredient.quantity} {ingredient.unit} {ingredient.item}
              </li>
            ))}
            {recipe.ingredients.length > 4 && (
              <li className="text-gray-500 italic">+ {recipe.ingredients.length - 4} more</li>
            )}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={() => onSelect(recipe)} 
          variant={selected ? 'primary' : 'secondary'}
          fullWidth
        >
          {selected ? 'Selected' : 'Select Recipe'}
        </Button>
      </CardFooter>
    </Card>
  );
} 