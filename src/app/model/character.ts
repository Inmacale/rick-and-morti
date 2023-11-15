export interface CharacterDto {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    [key: string]: string | number;
}