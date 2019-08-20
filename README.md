## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user## groups_usersテーブル

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null:false|
|mail|string|null:false|
|password|string|null:false,index:true|
|id|integer|null:false|

### Association
- has_many :tweets ,
- has_many :group, through: :groups_users
- has_many :groups_users

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null:false|
|id|integer|null:false|

### Association
- has_many :user, through: :groupes_users
- has_many :tweets
- has_many :group_users



## Tweetテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|index:true,null:false|
|group_id|references|index:true,null:false|
|id|integer|null:false|
|text|string||
|image|||

### Association
- belongs_to :user
- belongs_to :group
