//
//  ViewController.swift
//  JAM
//
//  Created by Jeffery Abbott on 8/3/23.
//

import UIKit
import Alamofire

class ViewController: UIViewController {

    
    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var exerciseSelector: UISegmentedControl!
    @IBOutlet weak var distanceField: UITextField!
    
    var day: Int = 0
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        let date = Date()
        let calendar = Calendar.current
        let components = calendar.dateComponents([.day, .month], from: date)
        day = components.day!
        
        dateLabel.text = "\(String(describing: components.month)) \(day)"
    }

    @IBAction func logDistance(_ sender: UIButton) {
        
        if (distanceField.text != "") {
            let distanceStr = NSString(string: distanceField.text!)
            let miles: Double
            
            if (exerciseSelector.selectedSegmentIndex == 2) {
                // convert meters to miles
                let meters = distanceStr.doubleValue
                miles = ((meters / 1609.344) * 100).rounded() / 100
            } else {
                miles = distanceStr.doubleValue
            }
            
            let parameters = [
                "key": REDACTED,
                "day": day,
                "exercise": exerciseSelector.titleForSegment(at: exerciseSelector.selectedSegmentIndex)!,
                "distance": miles
            ] as [String : Any]
            
            print(parameters)
        
            AF.request(URL.init(string: REDACTED)!, method: .post, parameters: parameters, encoding: JSONEncoding.default, headers: [:]).responseJSON { (response) in
                    print(response.result)

                    switch response.result {

                    case .success(_):
                        if let json = response.value
                        {
                            print(json)
                        }
                        break
                    case .failure(let error):
                        print(error)
                        break
                    }
                }
            
            clearValues()
        }
        
    }
    
    func clearValues() {
        distanceField.text = ""
    }
}

