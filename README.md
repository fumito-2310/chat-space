## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user## groups_usersテーブル

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null:false|
|mail|string|null:false|
|password|string|null:false,index:true|
|id|integer|null:false|

### Association
- has_many :tweet
- has_many :group, through: :groups_users

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null:false|
|id|integer|null:false|

### Association
- has_many :user, through: :groupes_users



## Tweetテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null:false,|
|id|integer|null:false|
|image|||

### Association
belongs_to :user
