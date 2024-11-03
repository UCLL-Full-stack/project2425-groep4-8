export class Ingredient {
    readonly id?: number;
    readonly name: string;
    readonly category: string;

    constructor(ingredient: { id?: number; name: string; category: string }) {
        this.validate(ingredient);
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.category = ingredient.category;
    }

    validate(ingredient: { id?: number; name: string; category: string }) {
        if (!ingredient.name) {
            throw new Error('Ingredient name is required');
        }

        if (!ingredient.category) {
            throw new Error('Ingredient category is required');
        }
    }

    equals(ingredient: Ingredient): boolean {
        return this.name === ingredient.name && this.category === ingredient.category;
    }

    static from(ingredient: { id?: number; name: string; category: string }): Ingredient {
        return new Ingredient(ingredient);
    }
}
