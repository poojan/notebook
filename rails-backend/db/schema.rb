# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_05_171855) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "Note", id: :serial, force: :cascade do |t|
    t.text "title", null: false
    t.text "body", null: false
    t.boolean "pinned", default: false, null: false
    t.text "bgColor", default: "#ffffff", null: false
    t.text "bgImage"
    t.datetime "createdAt", precision: 3, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updatedAt", precision: 3, null: false
  end

  create_table "_prisma_migrations", id: { type: :string, limit: 36 }, force: :cascade do |t|
    t.string "checksum", limit: 64, null: false
    t.timestamptz "finished_at"
    t.string "migration_name", limit: 255, null: false
    t.text "logs"
    t.timestamptz "rolled_back_at"
    t.timestamptz "started_at", default: -> { "now()" }, null: false
    t.integer "applied_steps_count", default: 0, null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.boolean "pinned"
    t.string "bgColor"
    t.string "bgImage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
