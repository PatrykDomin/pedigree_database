-- CreateTable
CREATE TABLE "Breeding" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "breeder" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
"id" SERIAL,
    "pkr" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "sex" BOOLEAN NOT NULL DEFAULT true,
    "litter" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pedigreeName" TEXT NOT NULL,
    "momId" INTEGER,
    "dadId" INTEGER,
    "titles" TEXT[],
    "phisical" TEXT,
    "breedingId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Breeding.name_unique" ON "Breeding"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dog.pkr_unique" ON "Dog"("pkr");

-- AddForeignKey
ALTER TABLE "Dog" ADD FOREIGN KEY("momId")REFERENCES "Dog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dog" ADD FOREIGN KEY("dadId")REFERENCES "Dog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dog" ADD FOREIGN KEY("breedingId")REFERENCES "Breeding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
