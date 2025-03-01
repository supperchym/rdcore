<?php

namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\Validation\Validator;

class DynamicDetailsTable extends Table
{
    public function initialize(array $config):void{
        $this->addBehavior('Timestamp'); 
         
        $this->belongsTo('Clouds');
         
        $this->belongsTo('PermanentUsers', [
            'className' => 'PermanentUsers',
            'foreignKey' => 'social_temp_permanent_user_id'
        ]);
        
        $this->belongsTo('PermanentUsers');
        
        $this->hasMany('DynamicPhotos',['dependent' => true]); 
        $this->hasMany('DynamicPairs',['dependent' => true]);
        $this->hasMany('DynamicPages',['dependent' => true]); 
        $this->hasMany('DataCollectors',['dependent' => true]); 
        $this->hasMany('DynamicDetailSocialLogins',['dependent' => true]);
        $this->hasOne('DynamicDetailCtcs',['dependent' => true]);           
    }
    
    public function validationDefault(Validator $validator):Validator{
        $validator = new Validator();
        $validator
            ->notEmpty('name', 'A name is required')
            ->add('name', [ 
                'nameUnique' => [
                    'message' => 'The name you provided is already taken. Please provide another one.',
                    'rule' => 'validateUnique', 
                    'provider' => 'table'
                ]
            ]);
        return $validator;
    }
       
}
