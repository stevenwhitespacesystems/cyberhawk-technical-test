function getGradeVariant(grade: number): "default" | "destructive" {
    return grade >= 3 ? "default" : "destructive";
}

export default getGradeVariant;
