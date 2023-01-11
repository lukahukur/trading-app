-- CreateTable
CREATE TABLE "currencies" (
    "id" SERIAL NOT NULL,
    "currency" VARCHAR(255),

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "side" CHAR(128),
    "time" DECIMAL(11,0),
    "currency" CHAR(255),

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "side" (
    "id" SERIAL NOT NULL,
    "side" VARCHAR(120),

    CONSTRAINT "side_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "side" VARCHAR(120),
    "amount" DECIMAL(33,8),
    "time" DECIMAL(13,0),
    "currency" VARCHAR(120),
    "price" DECIMAL(10,2),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_table" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255),
    "verified" BOOLEAN,
    "password" VARCHAR(255),
    "username" VARCHAR(128),
    "activation_link" VARCHAR(255),

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "btc" DECIMAL(20,6),
    "usdt" DECIMAL(10,2),
    "bnb" DECIMAL(20,4),
    "ada" DECIMAL(20,2) DEFAULT 0,
    "dot" DECIMAL(20,4),
    "eth" DECIMAL(20,6),
    "ltc" DECIMAL(20,4),
    "matic" DECIMAL(20,2),
    "shib" DECIMAL(20,2),
    "sol" DECIMAL(20,4),
    "uni" DECIMAL(20,4),
    "xrp" DECIMAL(20,2),

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crr_u" ON "currencies"("currency");

-- CreateIndex
CREATE UNIQUE INDEX "side_unique" ON "side"("side");

-- CreateIndex
CREATE UNIQUE INDEX "uniquemail" ON "user_table"("email");

-- CreateIndex
CREATE UNIQUE INDEX "uuid_" ON "user_table"("activation_link");

-- CreateIndex
CREATE UNIQUE INDEX "unique_user_id" ON "wallet"("user_id");

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_currency_fkey" FOREIGN KEY ("currency") REFERENCES "currencies"("currency") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_side_fkey" FOREIGN KEY ("side") REFERENCES "side"("side") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_currency_fkey" FOREIGN KEY ("currency") REFERENCES "currencies"("currency") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_side_fkey" FOREIGN KEY ("side") REFERENCES "side"("side") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "fk_constraint_user_table" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
