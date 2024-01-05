class CreateNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :notes do |t|
      t.string :title
      t.text :body
      t.boolean :pinned
      t.string :bgColor
      t.string :bgImage

      t.timestamps
    end
  end
end
