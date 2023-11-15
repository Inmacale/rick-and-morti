export interface CharacterDto extends BasicItemDto {
    species: string;
    type: string;
    gender: string;
    image: string;
    [key: string]: string | number;
}

export interface BasicItemDto {
    id: number;
    name: string;
    status: string;
}